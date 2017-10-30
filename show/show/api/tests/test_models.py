from django.test import TestCase

# from api.models import Movie
from api.models import Pergunta


# class TestMovieModel(TestCase):
#     def setUp(self):
#         self.movie = Movie(name="Split", year_of_release=2016)
#         self.movie.save()

#     def test_movie_creation(self):
#         self.assertEqual(Movie.objects.count(), 1)

#     def test_movie_representation(self):
#         self.assertEqual(self.movie.name, str(self.movie))


class TestPerguntaModel(TestCase):
    def setUp(self):
        self.pergunta = Pergunta(pergunta="Quem fundou a Microsoft?")
        self.pergunta.save()

    def test_pergunta_creation(self):
        self.assertEqual(Pergunta.objects.count(), 1)

    def test_pergunta_representation(self):
        self.assertEqual(self.pergunta.pergunta, str(self.pergunta))
