from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

# from api.models import Movie
from api.models import Pergunta
# from api.serializers import MovieSerializer
from api.serializers import PerguntaSerializer


# class MovieCreateView(ListCreateAPIView):
#     queryset = Movie.objects.all()
#     serializer_class = MovieSerializer

# class MovieDetailView(RetrieveUpdateDestroyAPIView):
#     queryset = Movie.objects.all()
#     serializer_class = MovieSerializer


class PerguntaCreateView(ListCreateAPIView):
    queryset = Pergunta.objects.all()
    serializer_class = PerguntaSerializer

class PerguntaDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Pergunta.objects.all()
    serializer_class = PerguntaSerializer
