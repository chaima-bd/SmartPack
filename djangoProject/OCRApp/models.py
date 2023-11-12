from django.db import models

# Create your models here.

# lets us explicitly set upload path and filename
def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

class MyModel(models.Model):
  #  creator = models.ForeignKey( User, on_delete=models.CASCADE, related_name="listings")
    title = models.CharField(max_length=100, blank=False, null=False)
    description = models.TextField()
    image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)