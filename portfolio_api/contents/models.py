from django.db import models


class Location(models.Model):
    id = models.AutoField(primary_key=True)
    city = models.CharField(max_length=255, null=True)
    state = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True)
    online = models.BooleanField(default=False)

    class Meta:
        db_table = 'locations'
        constraints = [
            models.UniqueConstraint(
                fields=['city', 'state', 'country', 'online'], name='unique_location')
        ]

    def __str__(self):
        if self.online:
            return 'online'
        if self.state:
            return ', '.join([self.city, self.state, self.country])
        return self.city + ', ' + self.country


class School(models.Model):
    class Level(models.TextChoices):
        PRIMARY = 'Primary'
        SECONDARY = 'Secondary'
        POSTSECONDARY = 'Postsecondary'

    class Status(models.TextChoices):
        ATTENDING = 'Attending'
        COMPLETED = 'Completed'
        BREAK = 'Break'
        DROPPED = 'Dropped'

    class Degree(models.TextChoices):
        HIGH_SCHOOL = 'High School'
        BACHELORS = 'Bachelor\'s Degree'

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    location = models.ForeignKey(
        Location, null=True,  on_delete=models.PROTECT)
    level = models.CharField(max_length=20,
                             choices=Level.choices, default=Level.POSTSECONDARY)
    degree_type = models.CharField(
        choices=Degree.choices, default=Degree.BACHELORS, max_length=30, null=True, blank=True)
    program_one = models.CharField(max_length=255, null=True, blank=True)
    program_two = models.CharField(max_length=255, null=True, blank=True)
    program_three = models.CharField(max_length=255, null=True, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20,
                              choices=Status.choices, default=Status.ATTENDING)

    class Meta:
        db_table = 'schools'

    def __str__(self):
        return self.name


class Keyword(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=255)

    class Meta:
        db_table = 'keywords'

    def __str__(self):
        return self.name


class StackCategory(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        db_table = 'stack_categories'

    def __str__(self):
        return self.name


class TechStack(models.Model):
    class Proficiency(models.TextChoices):
        BASIC = 'basic'
        INTERMEDIATE = 'intermediate'
        ADVANCED = 'advanced'

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    category = models.ManyToManyField(StackCategory, blank=True)
    proficiency = models.CharField(
        choices=Proficiency.choices, max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'technology_stacks'

    def __str__(self):
        return self.name


class Work(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    location = models.ForeignKey(
        Location, null=True,  on_delete=models.PROTECT)
    role = models.CharField(max_length=255)
    role_description = models.TextField(null=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True)
    stack = models.ManyToManyField(TechStack, blank=True)

    class Meta:
        db_table = 'works'
        constraints = [models.UniqueConstraint(
            fields=['name', 'role'], name='unique_work')]

    def __str__(self):
        return self.role + ', ' + self.name


class Course(models.Model):
    class Subject(models.TextChoices):
        COMPUTER_SCIENCE = 'Computer Science'
        ENGINEERING = 'Engineering'
        MATHEMATICS = 'Mathematics'
        APPLIED_MATHEMATICS = 'Applied Mathematics'
        OTHERS = 'Others'
    id = models.AutoField(primary_key=True)
    course_code = models.CharField(max_length=30)
    subject = models.CharField(
        max_length=255, blank=True, null=True, choices=Subject.choices)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    school = models.ForeignKey(School, on_delete=models.PROTECT)
    TA = models.BooleanField(default=False)
    professor_info = models.JSONField(blank=True, null=True)
    keywords = models.ManyToManyField(Keyword, blank=True)
    semester_level = models.IntegerField(choices=list(
        zip(range(0, 10), range(0, 10))), blank=True, null=True)

    class Meta:
        db_table = 'courses'
        constraints = [models.UniqueConstraint(
            fields=['course_code', 'school'], name='unique_course')]

    def __str__(self):
        return self.course_code + ' - ' + self.name


class BaseProject(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    stack = models.ManyToManyField(TechStack, blank=True)
    team_size = models.IntegerField(default=1)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    keywords = models.ManyToManyField(Keyword, blank=True)
    location = models.ManyToManyField(Location, blank=True)
    description = models.TextField(null=True, blank=True)
    project_url = models.TextField(null=True, blank=True)
    source_url = models.TextField(null=True, blank=True)
    extra = models.JSONField(null=True, blank=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.name


class AcademicProject(BaseProject):
    course = models.ForeignKey(Course, on_delete=models.PROTECT)

    class Meta:
        db_table = 'academic_projects'


class PersonalProject(BaseProject):
    class Meta:
        db_table = 'personal_projects'


class WorkProject(BaseProject):
    work = models.ForeignKey(Work, on_delete=models.PROTECT)

    class Meta:
        db_table = 'work_projects'
