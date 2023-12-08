from django.db import models

# Create your models here.

class Post(models.Model):
    title = models.CharField(blank=True, max_length=100)
    content = models.TextField(blank=True)
    image = models.ImageField(blank=True, upload_to='post_images')
    
    def __str__(self):
        return self.title