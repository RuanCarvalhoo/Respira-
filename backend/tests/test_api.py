from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_root():
    """Testa o endpoint raiz da API."""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to Respira+ API"}

def test_calculate_transport():
    """Testa o cálculo de emissões de transporte."""
    response = client.post(
        "/api/calculate/transport",
        json={"transport_type": "car_gasoline_km", "distance_km": 100}
    )
    assert response.status_code == 200
    data = response.json()
    assert "emissions_kg" in data
    assert data["category"] == "transportation"
    # 100 * 0.192 = 19.2
    assert abs(data["emissions_kg"] - 19.2) < 0.01

def test_calculate_energy():
    """Testa o cálculo de emissões de energia."""
    response = client.post(
        "/api/calculate/energy",
        json={"energy_type": "electricity_kwh", "consumption": 100}
    )
    assert response.status_code == 200
    data = response.json()
    assert "emissions_kg" in data
    assert data["category"] == "energy"

def test_calculate_food():
    """Testa o cálculo de emissões de alimentação."""
    response = client.post(
        "/api/calculate/food",
        json={"diet_type": "vegan_day", "days": 1}
    )
    assert response.status_code == 200
    data = response.json()
    assert "emissions_kg" in data
    assert data["category"] == "food"

def test_invalid_transport_type():
    """Testa o tratamento de erro para tipo de transporte inválido."""
    response = client.post(
        "/api/calculate/transport",
        json={"transport_type": "rocket_ship", "distance_km": 100}
    )
    assert response.status_code == 400

def test_register_user():
    """Testa o registro de um novo usuário."""
    response = client.post(
        "/api/auth/register",
        json={"name": "Test User", "email": "test@example.com", "password": "password123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_register_duplicate_email():
    """Testa a tentativa de registro com email duplicado."""
    # Ensure user exists (depends on test execution order, but good to be safe)
    client.post(
        "/api/auth/register",
        json={"name": "Test User", "email": "duplicate@example.com", "password": "password123"}
    )
    response = client.post(
        "/api/auth/register",
        json={"name": "Test User 2", "email": "duplicate@example.com", "password": "password456"}
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "Email already registered"

def test_login_user():
    """Testa o login de usuário."""
    # Register first
    email = "login@example.com"
    password = "password123"
    client.post(
        "/api/auth/register",
        json={"name": "Login User", "email": email, "password": password}
    )
    
    # Login
    response = client.post(
        "/api/auth/login",
        json={"email": email, "password": password}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_invalid_credentials():
    """Testa o login com credenciais inválidas."""
    response = client.post(
        "/api/auth/login",
        json={"email": "nonexistent@example.com", "password": "wrongpassword"}
    )
    assert response.status_code == 401
