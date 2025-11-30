# Respira+ 🌱

**Aplicativo de rastreamento de pegada de carbono baseado na ODS 13 - Ação Contra a Mudança Global do Clima**

## 📋 Sobre o Projeto

O Respira+ é um aplicativo que visa conscientizar e reduzir as emissões de carbono através de práticas sustentáveis e conscientes. O projeto permite que usuários:

- ✅ Calculem sua pegada de carbono
- ✅ Recebam dicas sustentáveis personalizadas
- ✅ Participem de missões para reduzir emissões
- ✅ Acompanhem sua evolução e impacto positivo ao longo do tempo

## 🚀 Funcionalidades

### 1. Calculadora de Pegada de Carbono
Calcula emissões de CO2 baseadas em:
- **Transporte**: Carro (gasolina/diesel/elétrico), ônibus, trem, avião, bicicleta, caminhada
- **Energia**: Consumo de eletricidade, gás natural, óleo de aquecimento
- **Alimentação**: Diferentes tipos de dieta (carnívora, vegetariana, vegana, etc.)

### 2. Sistema de Dicas Sustentáveis
- Dicas categorizadas por impacto (alto, médio, baixo)
- Sugestões específicas para transporte, energia e alimentação
- Dicas aleatórias para inspiração diária

### 3. Missões Sustentáveis
- Desafios com duração definida
- Sistema de pontuação
- Rastreamento de CO2 economizado
- Categorias: transporte, energia, alimentação

### 4. Rastreamento de Progresso
- Histórico de emissões
- Estatísticas pessoais
- Missões completadas e ativas
- Impacto líquido (emissões vs. economia)

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js (v18+)
- Python (v3.8+)
- Expo Go (no celular) ou Android Studio/Xcode (simulador)

### 1. Backend (API)

O backend é construído com FastAPI.

```bash
# Entre na pasta do backend
cd backend

# (Opcional) Crie e ative um ambiente virtual
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt

# Inicie o servidor
uvicorn app.main:app --reload
```
O servidor rodará em `http://localhost:8000`.

### 2. Frontend (App Mobile)

O frontend é construído com React Native e Expo.

```bash
# Entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o projeto
npx expo start
```
Escaneie o QR Code com o app Expo Go ou pressione `a` para abrir no emulador Android.

## 🧪 Testes

Execute os testes unitários:

```bash
# Todos os testes
python -m unittest discover tests

# Teste específico
python -m unittest tests.test_carbon_calculator
python -m unittest tests.test_tips_missions
python -m unittest tests.test_user_profile
```

## 📊 Estrutura do Projeto

```
Respira-/
├── respira_plus/           # Módulos principais
│   ├── __init__.py
│   ├── carbon_calculator.py    # Calculadora de pegada de carbono
│   ├── tips_missions.py        # Sistema de dicas e missões
│   └── user_profile.py         # Gerenciamento de perfil e progresso
├── tests/                  # Testes unitários
│   ├── __init__.py
│   ├── test_carbon_calculator.py
│   ├── test_tips_missions.py
│   └── test_user_profile.py
├── main.py                # Aplicativo de demonstração
├── requirements.txt       # Dependências do projeto
└── README.md             # Este arquivo
```

## 🌍 Fatores de Emissão

Os fatores de emissão são baseados em médias globais e estudos científicos:

### Transporte (kg CO2e por km)
- Carro a gasolina: 0.192
- Carro a diesel: 0.171
- Carro elétrico: 0.053
- Ônibus: 0.089
- Trem: 0.041
- Avião (voos curtos): 0.255
- Avião (voos longos): 0.195
- Bicicleta/Caminhada: 0.0

### Energia (kg CO2e por kWh/litro)
- Eletricidade: 0.233 por kWh
- Gás natural: 0.185 por kWh
- Óleo de aquecimento: 2.52 por litro

### Alimentação (kg CO2e por dia)
- Dieta rica em carne: 7.19
- Dieta média em carne: 5.63
- Dieta baixa em carne: 4.67
- Pescatariana: 3.91
- Vegetariana: 3.81
- Vegana: 2.89

## 🎯 ODS 13 - Ação Contra a Mudança Global do Clima

Este projeto está alinhado com o Objetivo de Desenvolvimento Sustentável 13 da ONU, que visa:

- Fortalecer a resiliência e a capacidade de adaptação a riscos relacionados ao clima
- Integrar medidas da mudança do clima nas políticas, estratégias e planejamentos nacionais
- Melhorar a educação, aumentar a conscientização e a capacidade humana e institucional sobre mitigação, adaptação, redução de impacto e alerta precoce da mudança do clima

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests
- Melhorar a documentação

## 📝 Licença

Este projeto é de código aberto e está disponível para uso educacional e pessoal.

## 👥 Autores

Equipe Respira+

## 🙏 Agradecimentos

- ONU - Objetivos de Desenvolvimento Sustentável
- Comunidade científica por dados sobre fatores de emissão
- Todos que contribuem para a luta contra as mudanças climáticas

---

**Juntos podemos fazer a diferença pelo nosso planeta! 🌍💚**