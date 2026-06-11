from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Student
from .serializers import StudentSerializer


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def student_list(request):
    queryset = Student.objects.all().order_by('-created_at')
    search_query = request.query_params.get('search', '').strip()

    if search_query:
        queryset = queryset.filter(
            Q(first_name__icontains=search_query)
            | Q(last_name__icontains=search_query)
            | Q(email__icontains=search_query)
        )

    if request.method == 'GET':
        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(queryset, request)
        serializer = StudentSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data) if page is not None else Response(serializer.data)

    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def student_detail(request, pk):
    student = get_object_or_404(Student, pk=pk)

    if request.method == 'GET':
        return Response(StudentSerializer(student).data)

    if request.method in ('PUT', 'PATCH'):
        serializer = StudentSerializer(student, data=request.data, partial=request.method == 'PATCH')
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    student.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
