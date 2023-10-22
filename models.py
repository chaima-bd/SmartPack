from django.db import models
from django.contrib.auth.models import User
# Utilisez un signal pour créer automatiquement le profil utilisateur lors de la création d'un utilisateur
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    num_telephone_us = models.CharField(max_length=15)
    email_user = models.EmailField()

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()


# Create your models here.

class Member(models.Model):
  firstname = models.CharField(max_length=255)
  lastname = models.CharField(max_length=255)


class Librairie(models.Model):
    nom_lib = models.CharField(max_length=100)
    adresse_lib = models.TextField()
    telephone_lib = models.CharField(max_length=15)
    email_lib = models.EmailField()

