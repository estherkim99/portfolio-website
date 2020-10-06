from django.urls import path

from . import views

urlpatterns = [
    path('schools', views.index_school, name='schools'),
    path('works', views.index_work, name='works'),
    path('courses', views.index_courses, name='courses'),
    path('projects', views.index_projects, name='projects'),
    path('leaderships', views.index_leaderships, name='leaderships'),
    path('skills', views.index_skills, name='skills'),
]