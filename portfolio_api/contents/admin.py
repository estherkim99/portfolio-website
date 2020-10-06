from django.contrib import admin
from contents.models import School, Work, AcademicProject, \
    PersonalProject, WorkProject, Location, TechStack, StackCategory, Keyword, \
        Course, Leadership

admin.site.register(School)
admin.site.register(Location)
admin.site.register(TechStack)
admin.site.register(Work)
admin.site.register(AcademicProject)
admin.site.register(PersonalProject)
admin.site.register(WorkProject)
admin.site.register(StackCategory)
admin.site.register(Keyword)
admin.site.register(Course)
admin.site.register(Leadership)