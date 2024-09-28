from django.shortcuts import render, redirect, get_object_or_404
from .models import Rule
from .forms import RuleForm
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from django.contrib.auth.decorators import login_required
# Home view - handles displaying rules and filters
def home(request):
    rules = Rule.objects.all()

    selected_author = request.GET.get('author', 'Select')
    selected_tag = request.GET.get('tags', 'Select')
    selected_operator = request.GET.get('operator', 'Select')

    if selected_author != 'Select':
        rules = rules.filter(author=selected_author)
    if selected_tag != 'Select':
        rules = rules.filter(tags__icontains=selected_tag)

    tags_set = set()
    authors_set = set()
    for rule in Rule.objects.all():
        authors_set.add(rule.author)
        for tag in rule.tags.split(','):
            tags_set.add(tag.strip())

    tags = sorted(tags_set)
    authors = sorted(authors_set)

    return render(request, 'pages/home.html', {
        'rules': rules,
        'tags': tags,
        'authors': authors,
        'selected_author': selected_author,
        'selected_tag': selected_tag,
        'selected_operator': selected_operator,
    })

# Form view - handles the form submission for creating new rules and sending emails
def form_view(request):
    if request.method == 'POST':
        form = RuleForm(request.POST)
        if form.is_valid():
            if request.user.is_authenticated:
                rule = form.save()
                return redirect('home')
            # rule = form.save()
            # Rule.objects.all().delete()

            subject = "New Rule Submission Notification"
            recipient_email = "kufs96bd@gmail.com"
            from_email = settings.EMAIL_HOST_USER

            # Render the email template with form data
            message_html = render_to_string('emails/rule_notification.html', {
                'author': form.cleaned_data['author'],
                'title': form.cleaned_data['title'],
                'description': form.cleaned_data['description'],
                'rule_text': form.cleaned_data['rule_text'],
                'reference': form.cleaned_data.get('reference', 'No reference provided'),
                'additional_info': form.cleaned_data.get('additional_info', 'No additional info'),
                'tags': form.cleaned_data.get('tags', 'No tags provided'),
            })

            # Send the email
            send_mail(
                subject,
                '', 
                from_email,
                [recipient_email],
                html_message=message_html 
            )

            
            return redirect('home')
    else:
        form = RuleForm()

    return render(request, 'pages/form.html', {'form': form})

def details(request, id):
    rule = get_object_or_404(Rule, id=id)  
    return render(request, 'pages/details.html', {'rule': rule})

@login_required 
def delete_rule(request, rule_id):
    rule = get_object_or_404(Rule, id=rule_id)
    rule.delete()
    return redirect('home')

@login_required
def edit_rule(request, rule_id):
    rule = get_object_or_404(Rule, id=rule_id)

    if request.method == 'POST':
        form = RuleForm(request.POST, instance=rule)
        if form.is_valid():
            form.save()
            return redirect('home')  
    else:
        form = RuleForm(instance=rule)

    return render(request, 'pages/form.html', {'form': form})