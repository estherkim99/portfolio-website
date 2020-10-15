from rest_framework import serializers
from contents.models import PersonalProject, AcademicProject, Keyword, TechStack, StackCategory, \
    Course, School, Work, Location, Leadership


class StackCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = StackCategory
        fields = '__all__'


class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyword
        fields = '__all__'


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class SchoolSerializer(serializers.ModelSerializer):
    location = LocationSerializer()

    class Meta:
        model = School
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    school = SchoolSerializer()
    keywords = KeywordSerializer(many=True)

    class Meta:
        model = Course
        fields = '__all__'


class StackSerializer(serializers.ModelSerializer):
    category = StackCategorySerializer(many=True)

    class Meta:
        model = TechStack
        fields = '__all__'


class BaseProjectSerializer(serializers.ModelSerializer):
    keywords = KeywordSerializer(many=True)
    stack = StackSerializer(many=True)
    location = LocationSerializer()


class PersonalProjectSerializer(BaseProjectSerializer):
    class Meta:
        model = PersonalProject
        fields = '__all__'


class AcademicProjectSerializer(BaseProjectSerializer):
    course = CourseSerializer()

    class Meta:
        model = AcademicProject
        fields = '__all__'


class WorkSerializer(serializers.ModelSerializer):
    location = LocationSerializer()
    stack = StackSerializer(many=True)

    class Meta:
        model = Work
        fields = '__all__'

class LeadershipSerializer(serializers.ModelSerializer):
    location = LocationSerializer()
    keywords = KeywordSerializer(many=True)

    class Meta:
        model = Leadership
        fields = '__all__'