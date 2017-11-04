from django.db import models

class Pergunta(models.Model):
    id_pergunta = models.IntegerField(primary_key=True)
    pergunta = models.CharField(max_length=1000)

    class Meta:
        managed = False
        db_table = 'pergunta'

class Alternativa(models.Model):
    id_alternativa = models.IntegerField()
    id_pergunta = models.ForeignKey('Pergunta', db_column='id_pergunta')
    alternativa = models.CharField(max_length=1000)
    resposta = models.TextField()  # This field type is a guess.
    frequencia = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'alternativa'
        unique_together = (('id_pergunta', 'id_alternativa'),)