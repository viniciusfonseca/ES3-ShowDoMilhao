from django.db import models

# class Movie(models.Model):
#     name = models.CharField(max_length=100)
#     year_of_release = models.PositiveSmallIntegerField()

#     def __str__(self):
#         return self.name

class Pergunta(models.Model):
    pergunta = models.CharField(max_length=1000)    

    def __str__(self):
        return self.pergunta
