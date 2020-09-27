from django.http import JsonResponse
from contents.models import Work, School, AcademicProject, PersonalProject, Course
from contents.serializers import AcademicProjectSerializer, PersonalProjectSerializer, CourseSerializer, \
    SchoolSerializer, WorkSerializer


def index_work(request):
    works = WorkSerializer(Work.objects.all(), many=True).data
    return JsonResponse({'works': works})


def index_school(request):
    schools = SchoolSerializer(School.objects.all(), many=True).data
    return JsonResponse({'schools': schools})


def index_courses(request):
    courses = CourseSerializer(Course.objects.all(), many=True).data
    return JsonResponse({'courses': courses})


def index_projects(request):
    academic = AcademicProjectSerializer(
        AcademicProject.objects.all(), many=True).data
    personal = PersonalProjectSerializer(
        PersonalProject.objects.all(), many=True).data
    return JsonResponse({'projects': {'academic': academic, 'personal': personal}})
