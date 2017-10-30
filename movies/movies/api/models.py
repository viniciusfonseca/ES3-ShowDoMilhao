from django.db import models

class Movie(models.Model):
    name = models.CharField(max_length=100)
    year_of_release = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.name
