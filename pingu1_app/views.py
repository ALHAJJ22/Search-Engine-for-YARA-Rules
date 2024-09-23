from django.shortcuts import render, redirect, get_object_or_404
from .models import Rule
from .forms import RuleForm

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

# Form view - handles the form submission for creating new rules
def form_view(request):
    if request.method == 'POST':
        form = RuleForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = RuleForm()

    return render(request, 'pages/form.html', {'form': form})

# Details view - displays details of a specific rule
def details(request, id):
    rule = get_object_or_404(Rule, id=id)  # Fetch the rule by id using the correct parameter
    return render(request, 'pages/details.html', {'rule': rule})
