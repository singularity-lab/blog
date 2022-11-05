---
layout: post
title: A Brief Introduction To Streamlit 
date: 2022-11-05
author: yhchen
categories:
  - 数据分析部
tags:
  - streamlit

---

# **Introduction to Data App**

Streamlit is a useful tool to turn data scripts into shareable web apps.
"All in pure Python. No front‑end experience required." See more at https://streamlit.io/

## **A practical example by me to apply streamlit**

I will illustrate several steps in  generating a data app by my example.You can follow my steps to generate a data app by youself.

If you have never use streamlit before, you need to install streamlit first using `pip install streamlit`.

### **Step 1: Finish a data project in a python file**

First, I created an empty folder named **recipe_app**. In the folder, I created a python file named **app-diet1_2.py**

Then I finished the project based on a dataset from Kaggle. If you are interested in the dataset you can view it by the [link](https://www.kaggle.com/datasets/thedevastator/healthy-diet-recipes-a-comprehensive-dataset)

The app can recommend you with quantities of  recipes based on your diet and prederred cuisines.Then it will analyze the recommended recipes based on your likesfor you. Additionally, you can also use it to regulate recipes based on advice from nutritionists.

The codes below are the first few lines of the data project. Please see the whole python file [here](https://github.com/yh-eric-chan/a_recipe_app/blob/main/app-diet1_2.py)

```python
import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
plt.style.use('seaborn')
# set title for the app
st.title('A recipe Recommendation App ')
st.subheader('by Eric & Sirena')
df = pd.read_csv('All_Diets.csv')
# process the data
df['percentage_protein'] =  100 * df['Protein(g)'] / (df['Protein(g)'] + df['Carbs(g)'] + df['Fat(g)'])
df['percentage_carbs'] = 100 * df['Carbs(g)'] / (df['Protein(g)'] + df['Carbs(g)'] + df['Fat(g)'])
df['percentage_fat'] = 100 * df['Fat(g)'] / (df['Protein(g)'] + df['Carbs(g)'] + df['Fat(g)'])
# ... ...
```

If you don't understand how to use streamlit functions, it is advised to have a look at [Streamlit library](https://docs.streamlit.io/).

### **Step 2: Run the app in terminal**

- Activate the environment, which is not necessary if you use default environment
- Use `cd recipe_app` to find the folder
- Input `streamlit run app-diet1_2.py` to run the app in the browser

Then we can see the app automatically displayed on the browser. We can also open the browser and enter the address: http://localhost:8501 to see the app.

### **Step 3: Deploy App**

To make the app public, I deployed it on Streamlit cloud. You may need to creat an account first on https://share.streamlit.io/signup

- Create a new repo in github, then paste the python file **app-diet1_2.py** into the repo and set it public
- Add the dataset into the repo
- Add a **requirements.txt** file which contains the packages use in the project, such as *matplotlib*
- Commit the local changes and push the commits to the origin remote

ps: If you don't know how to do the steps above, please check other blogs about *GitHub*. 

- Click *new app* on Streamlit cloud and use Paste GitHub URL option by entering the streamlit app file path
- Click *Deploy!* and wait for a few minutes 

Finally, we can get a nice data app. If you want to play with the *Recipe Recommendation App* by me, please go to the [GitHub repo page](https://yh-eric-chan.github.io/a_recipe_app/).

## Now, do it yourself !








