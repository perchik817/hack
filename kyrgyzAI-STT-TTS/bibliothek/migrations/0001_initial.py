# Generated by Django 5.0.4 on 2024-04-18 04:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=100)),
                ('content', models.TextField()),
                ('image', models.ImageField(upload_to='books/')),
            ],
        ),
    ]
