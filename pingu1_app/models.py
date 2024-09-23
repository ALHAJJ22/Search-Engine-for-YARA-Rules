from django.db import models

class Rule(models.Model):
    author = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    reference = models.URLField(blank=True, null=True)
    description = models.TextField()
    rule_text = models.TextField()
    additional_info = models.TextField(blank=True, null=True)
    tags = models.CharField(max_length=200)  # This can store comma-separated tags
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically sets the date when a rule is created

    def __str__(self):
        return self.title
