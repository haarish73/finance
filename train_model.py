import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

df = pd.read_csv("salary_data.csv")
df = df.dropna()

encoders = {}
for col in ["Gender", "Education Level", "Job Title"]:
    encoders[col] = LabelEncoder()
    df[col] = encoders[col].fit_transform(df[col])

joblib.dump(encoders, "label_encoders.pkl")

X = df.drop(columns=["Salary"])
y = df["Salary"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

rf_model = RandomForestRegressor()
rf_model.fit(X_train, y_train)

joblib.dump(rf_model, "salary_model.pkl")
