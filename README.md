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

## 📦 Instalação

### Pré-requisitos
- Python 3.7 ou superior

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/MarceloDChagas/Respira-.git
cd Respira-
```

2. (Opcional) Crie um ambiente virtual:
```bash
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

## 🎯 Como Usar

### Executar a Demonstração

Execute o aplicativo de demonstração:
```bash
python main.py
```

Isso irá:
- Criar um usuário de demonstração
- Calcular uma pegada de carbono semanal
- Mostrar dicas sustentáveis
- Listar missões disponíveis
- Iniciar uma missão
- Exibir estatísticas do usuário

### Usar como Biblioteca

```python
from respira_plus.carbon_calculator import CarbonCalculator
from respira_plus.tips_missions import TipsMissionsManager
from respira_plus.user_profile import UserProfile

# Criar calculadora
calculator = CarbonCalculator()

# Calcular emissões de transporte (100 km de carro a gasolina)
emissions = calculator.calculate_transportation('car_gasoline_km', 100)
print(f"Emissões: {emissions:.2f} kg CO2e")

# Obter dicas sustentáveis
tips_manager = TipsMissionsManager()
tips = tips_manager.get_random_tips(3)
for tip in tips:
    print(f"{tip['title']}: {tip['description']}")

# Criar perfil de usuário
user = UserProfile("user001", "João Silva")
user.add_emission_record("2025-01-01", 50.0, {
    'transportation': 30.0,
    'energy': 15.0,
    'food': 5.0
})

# Ver estatísticas
stats = user.get_statistics()
print(f"Total de emissões: {stats['total_emissions_kg']:.2f} kg CO2e")
```

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