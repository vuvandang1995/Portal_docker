from django.conf.urls import include, url
from django.urls import path
from . import views

app_name = 'superadmin'
urlpatterns = [
    path('', views.user_login),
    path('home', views.home, name='home'),
    path('flavors', views.flavors, name='flavors'),
    path('users', views.users, name='users'),

    # url(r'register/$',views.register, name='register'),
    # url(r'login/$', views.user_login, name='login'),

    path('profile/', views.user_profile, name='profile'),
    path('logout/', views.user_logout, name='logout'),
    path(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.activate, name='activate'),
    path(r'^resetpassword/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.resetpwd, name='resetpassword'),
    path('home_data_<str:ops_ip>', views.home_data, name='home_data'),

    # url(r'chat/([0-9]{5})',views.chat, name='chat'),
    # url(r'update_status/$', views.update_status, name='update_status'),
    # url(r'edit_contact/([^@]+@[^@]+\.[^@]+)', views.edit_contact, name='edit_contact'),
    # url(r'add_contact/$', views.add_contact, name='add_contact'),
    path('payment', views.payment, name='payment'),
    path('payment_ipn', views.payment_ipn, name='payment_ipn'),
    path('payment_return', views.payment_return, name='payment_return'),
    path('query', views.query, name='query'),
    path('refund', views.refund, name='refund'),
]
