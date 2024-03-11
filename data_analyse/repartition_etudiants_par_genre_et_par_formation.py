import pandas as pd

import seaborn as sns

import matplotlib.pyplot as plt



# Load the data

file_path = '/content/sample_data/student_profiles.jsonl'

data = []

with open(file_path, 'r') as file:

    for line in file:

        data.append(json.loads(line))

df = pd.DataFrame(data)



# Plot

plt.figure(figsize=(12, 8))

sns.barplot(x='Major', y='GPA', data=df)  # Supprimez 'hue='Sex'' pour ignorer la variable 'Sex'

plt.title('GPA par Formation')

plt.xlabel('Formation (Major)')

plt.ylabel('GPA')

plt.xticks(rotation=45, ha='right')

plt.tight_layout()

plt.show()





GPA par formation et par genre :

import pandas as pd

import seaborn as sns

import matplotlib.pyplot as plt



# Load the data

file_path = '/content/sample_data/student_profiles.jsonl'

data = []

with open(file_path, 'r') as file:

    for line in file:

        data.append(json.loads(line))

df = pd.DataFrame(data)



# Plot

plt.figure(figsize=(12, 8))

sns.barplot(x='Major', y='GPA', hue='Sex', data=df)

plt.title('GPA par Formation et par Sexe')

plt.xlabel('Formation (Major)')

plt.ylabel('GPA')

plt.xticks(rotation=45, ha='right')

plt.tight_layout()

plt.legend(title='Sexe')

plt.show()