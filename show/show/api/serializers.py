from rest_framework.serializers import ModelSerializer

# from api.models import Movie
from api.models import Pergunta

class PerguntaSerializer(ModelSerializer):
    class Meta:
        model = Pergunta
        fields = ('id', 'pergunta')
        extra_kwargs = {
            'id': {'read_only': True}
        }
