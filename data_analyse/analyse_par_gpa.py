# -*- coding: utf-8 -*-
"""students_maroua.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1I4HiW19VI4Tguyt_q7HywZZR8CIhuYkw
"""

import pandas as pd
from google.colab import files
df = pd.read_json('/content/sample_data/student_profiles.jsonl',typ='frame',lines=True)
df.head()

# @title GPA

from matplotlib import pyplot as plt
df['GPA'].plot(kind='hist', bins=20, title='GPA')
plt.gca().spines[['top', 'right',]].set_visible(False)

"""# Analyse des données

"""

df.describe()

df['Major'].value_counts()

df['Hobbies'].value_counts()

"""Graphique en baton qui presente le GPA par université"""

import pandas as pd
# Calcul de la moyenne des GPA par université
mean_gpa = df.groupby('State/Province')['GPA'].mean().reset_index(name='MoyenneGPA')
#transformation en dataframe
df_moyenne = pd.DataFrame(mean_gpa)
#tranformation en tableau clé/valeur
data_mean = df_moyenne.set_index('State/Province')['MoyenneGPA'].to_dict()
print(data_mean)
# Calcul du maximum des GPA par université
max_gpa = df.groupby('State/Province')['GPA'].max().reset_index(name='MaximumGPA')
#transformation en dataframe
df_max = pd.DataFrame(max_gpa)
#tranformation en tableau clé/valeur
data_max = df_max.set_index('State/Province')['MaximumGPA'].to_dict()
print(data_max)
# Calcul du minimum des GPA par université
min_gpa = df.groupby('State/Province')['GPA'].min().reset_index(name='MinimumGPA')
#transformation en dataframe
df_min = pd.DataFrame(min_gpa)
#tranformation en tableau clé/valeur
data_min = df_min.set_index('State/Province')['MinimumGPA'].to_dict()
print(data_min)
# Calcul des quartiles des GPA par université
quartiles_gpa = df.groupby('State/Province')['GPA'].quantile([0.25, 0.5, 0.75]).reset_index(name='QuartilesGPA')
#transformation en dataframe
df_quartiles = pd.DataFrame(quartiles_gpa)
#tranformation en tableau clé/valeur
data_quartiles = df_quartiles.set_index('State/Province')['QuartilesGPA'].to_dict()
print(data_quartiles)

# Affichage des résultats
#print("Moyenne des GPA par université:")
#print(mean_gpa)
#print("\nMaximum des GPA par université:")
#print(max_gpa)
#print("\nMinimum des GPA par université:")
#print(min_gpa)
#print("\nQuartiles des GPA par université:")
#print(quartiles_gpa)

import pandas as pd
# Calcul de la moyenne des GPA par université
mean_gpa = df.groupby('State/Province')['GPA'].mean().reset_index(name='AverageGPA')
#transformation en dataframe
df_moyenne = pd.DataFrame(mean_gpa)
#tranformation en tableau clé/valeur
data_mean = df_moyenne.set_index('State/Province')['AverageGPA'].to_dict()
print(data_mean)
# Calcul du maximum des GPA par université
max_gpa = df.groupby('State/Province')['GPA'].max().reset_index(name='MaximumGPA')
#transformation en dataframe
df_max = pd.DataFrame(max_gpa)
#tranformation en tableau clé/valeur
data_max = df_max.set_index('State/Province')['MaximumGPA'].to_dict()
print(data_max)
# Calcul du minimum des GPA par université
min_gpa = df.groupby('State/Province')['GPA'].min().reset_index(name='MinimumGPA')
#transformation en dataframe
df_min = pd.DataFrame(min_gpa)
#tranformation en tableau clé/valeur
data_min = df_min.set_index('State/Province')['MinimumGPA'].to_dict()
print(data_min)
# Calcul des quartiles des GPA par université
#quartiles_gpa = df.groupby('State/Province')['GPA'].quantile([0.25, 0.5, 0.75]).reset_index(name='QuartilesGPA')
#transformation en dataframe
#df_quartiles = pd.DataFrame(quartiles_gpa)
#tranformation en tableau clé/valeur
#data_quartiles = df_quartiles.set_index('State/Province')['QuartilesGPA'].to_dict()
#print(data_quartiles)

# Supposons que vous ayez déjà calculé les moyennes, minimums et maximums des GPA par État/Province
# Ces données sont stockées dans les dictionnaires data_mean, data_min et data_max

# Création d'un DataFrame à partir des données de la moyenne, du minimum et du maximum des GPA
df_combined = pd.DataFrame({
    'State/Province': list(data_mean.keys()),
    'AverageGPA': list(data_mean.values()),
    'MinimumGPA': [data_min[state] for state in data_mean.keys()],
    'MaximumGPA': [data_max[state] for state in data_mean.keys()],
    'MaximumGPA': [data_max[state] for state in data_mean.keys()]
})

# Transformation en un tableau clé/valeur sous la forme {université: {min:2, max:4, moyenne:3.3}}
objets = []
for _, row in df_combined.iterrows():
    objet = {
        'university': row['State/Province'],
        'min': row['MinimumGPA'],
        'max': row['MaximumGPA'],
        'average': row['AverageGPA']
    }
    objets.append(objet)

# Affichage des objets sous forme de liste
print(objets)

import json

# Enregistrement des données dans un fichier JSON
with open('objets.json', 'w') as json_file:
    json.dump(objets, json_file)

print("Les données ont été enregistrées avec succès dans mean_gpa.json")

import matplotlib.pyplot as plt

# Convertir les données en listes pour le tracé
states = list(data_mean.keys())
mean_values = list(data_mean.values())

# Création du graphique à barres
plt.figure(figsize=(10, 6))
plt.bar(states, mean_values, color='skyblue')
plt.xlabel('État/Province')
plt.ylabel('Moyenne GPA')
plt.title('Moyenne des GPA par État/Province')
plt.xticks(rotation=45, ha='right')  # Rotation des étiquettes de l'axe des x
plt.grid(axis='y', linestyle='--', alpha=0.7)  # Ajouter une grille
plt.tight_layout()  # Ajustement automatique de la disposition
plt.show()

"""Graphe pour voir par region le nombre d'etudiant par année
(tendance d'abandon)
"""

import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_json('/content/sample_data/student_profiles.jsonl',typ='frame',lines=True)
# Grouper les données par État/Province et par Année, puis compter le nombre d'étudiants dans chaque groupe
student_counts = df.groupby(['State/Province', 'Year']).size().unstack()

# Tracer le graphique à barres
student_counts.plot(kind='bar', figsize=(12, 6), stacked=True)
plt.xlabel('État/Province')
plt.ylabel('Nombre d\'étudiants')
plt.title('Nombre d\'étudiants par État/Province et par année')
plt.legend(title='Année', bbox_to_anchor=(1.05, 1), loc='upper left')
plt.xticks(rotation=45, ha='right')  # Rotation des étiquettes de l'axe des x
plt.tight_layout()
plt.show()

"""graphe presentant le nombre d'etudiant par année d'etudiant par université et par formation"""

import pandas as pd
import json
import matplotlib.pyplot as plt
df = pd.read_json('/content/sample_data/student_profiles.jsonl',typ='frame',lines=True)
# Grouper les données par Université, par Majeur et par Année, puis compter le nombre d'étudiants dans chaque groupe
student_counts = df.groupby(['State/Province', 'Major', 'Year']).size().unstack()
#print(student_counts)
#transformation en dataframe
df_count = pd.DataFrame(student_counts)
print(df_count)
#tranformation en tableau clé/valeur
data_count = df_count.set_index('State/Province', 'Major')['Freshman']['Junior']['Senior']['Sophomore'].to_dict()
#print(data_count)

import pandas as pd

# Chargement des données depuis le fichier JSON
df = pd.read_json('/content/sample_data/student_profiles.jsonl', typ='frame', lines=True)

# Grouper les données par État/Province, par Majeur et par Année, puis compter le nombre d'étudiants dans chaque groupe
student_counts = df.groupby(['State/Province', 'Major', 'Year']).size().unstack()

# Transformation en DataFrame
df_count = pd.DataFrame(student_counts)

# Transformation en un objet avec la structure spécifiée
student_data = []
for state_province, data in df_count.iterrows():
    state_data = {'State/Province': state_province}
    majors_data = []
    for major, count in data.items():
        major_data = {major: count}
        majors_data.append(major_data)
    state_data['Majors'] = majors_data
    student_data.append(state_data)

# Affichage des données sous forme d'objet
#for data in student_data:
    #print(data)
# Enregistrement des données dans un fichier JSON
with open('maroua_graphe2.json', 'w') as json_file:
    json.dump(student_data, json_file)

print("Les données ont été enregistrées avec succès dans maroua_graphe2.json")

import pandas as pd
# Chargement des données depuis le fichier JSON
df = pd.read_json('/content/sample_data/student_profiles.jsonl', typ='frame', lines=True)

# Calcul de la moyenne des GPA par state et par formation
mean_gpa = df.groupby(['State/Province', 'Major'])['GPA'].mean().reset_index(name='AverageGPA')

# Calcul du maximum des GPA par state et par formation
max_gpa = df.groupby(['State/Province', 'Major'])['GPA'].max().reset_index(name='MaximumGPA')

# Calcul du minimum des GPA par state et par formation
min_gpa = df.groupby(['State/Province', 'Major'])['GPA'].min().reset_index(name='MinimumGPA')

# Fusion des données de moyenne, maximum et minimum des GPA par state et par formation
df_combined = pd.merge(mean_gpa, max_gpa, on=['State/Province', 'Major'])
df_combined = pd.merge(df_combined, min_gpa, on=['State/Province', 'Major'])

# Affichage des données
print(df_combined)
# Transformation en un tableau clé/valeur sous la forme {université: {formation: {min:2, max:4, moyenne:3.3}}}
objetstatFormUniv = {}
for index, row in df_combined.iterrows():
    state = row['State/Province']
    formation = row['Major']
    min_gpa = row['MinimumGPA']
    max_gpa = row['MaximumGPA']
    avg_gpa = row['AverageGPA']
    if state not in objetstatFormUniv:
        objetstatFormUniv[state] = {}
    objetstatFormUniv[state][formation] = {'min': min_gpa, 'max': max_gpa, 'moyenne': avg_gpa}

# Affichage des objets sous forme de dictionnaire
print(objetstatFormUniv)
import json

# Enregistrement des données dans un fichier JSON
with open('objetstatFormUniv.json', 'w') as json_file:
    json.dump(objetstatFormUniv, json_file)

print("Les données ont été enregistrées avec succès dans mean_gpa.json")