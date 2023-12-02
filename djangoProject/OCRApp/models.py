from django.db import models

# Create your models here.

#def upload_to(instance, filename):
#    return 'posts/{filename}'.format(filename=filename)

# lets us explicitly set upload path and filename
#def upload_to(instance, filename):
#    return 'images/{filename}'.format(filename=filename)

#class ImageModel(models.Model):
  #  creator = models.ForeignKey( User, on_delete=models.CASCADE, related_name="listings")
#    title = models.CharField(max_length=100, blank=False, null=False)
#    description = models.TextField()
#    image = models.ImageField("Image", upload_to=upload_to, blank=True, null=True, default='images/default.jpg')

class ScannedImage(models.Model):
    image = models.ImageField(upload_to='scanned_images/')
    created_at = models.DateTimeField(auto_now_add=True)