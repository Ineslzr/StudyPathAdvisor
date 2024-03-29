# -*- coding: utf-8 -*-
"""TOP_15.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1nnbjjw6GHdWqqrswqNONjwWg7BAytx8Y
"""

import pandas as pd
import json

chemin_fichier = r'C:\\Users\\sadou\\Downloads\\archive-1\\student_profiles.jsonl'
df = pd.read_json(chemin_fichier, lines=True)

df["Université"] = "Université de " + df["State/Province"]

nombre_etudiants_par_major_et_universite = df.groupby(['Major', 'Université']).size().reset_index(name='NombreEtudiants')

nombre_etudiants_par_major_et_universite = nombre_etudiants_par_major_et_universite.sort_values(['Major', 'NombreEtudiants'], ascending=[True, False])

resultat_imbrique = nombre_etudiants_par_major_et_universite.groupby('Major').apply(
    lambda x: x.head(15)[['Université', 'NombreEtudiants']].to_dict('records')
).reset_index(name='Universités').to_dict('records')

chemin_fichier_modifié = r'C:\\Users\\sadou\\Downloads\\archive-1\\student_profiles_modified6.json'

with open(chemin_fichier_modifié, 'w', encoding='utf-8') as f:
    json.dump(resultat_imbrique, f, ensure_ascii=False, indent=4)