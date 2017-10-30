from django.conf.urls import url

# from api.views import MovieCreateView, MovieDetailView
from api.views import PerguntaCreateView, PerguntaDetailView

urlpatterns = [
    # url(r'^perguntas/$', MovieCreateView.as_view(), name='movies'),
    # url(r'^perguntas/(?P<pk>[0-9]+)$', MovieDetailView.as_view(), name='detail'),
    url(r'^perguntas/$', PerguntaCreateView.as_view(), name='perguntas'),
    url(r'^perguntas/(?P<pk>[0-9]+)$', PerguntaDetailView.as_view(), name='detail'),
]
