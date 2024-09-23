from django import forms
from .models import Rule

class RuleForm(forms.ModelForm):
    class Meta:
        model = Rule
        fields = ['author', 'title', 'reference', 'description', 'rule_text', 'additional_info', 'tags']
        widgets = {
            'tags': forms.TextInput(attrs={'placeholder': 'Enter tags separated by commas (e.g., security, compliance)'})
        }
