#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Final comprehensive fix for all remaining UTF-8 encoding issues
"""
import re

filepath = 'js/data/capitals-data.js'

# Read file
with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()

# Comprehensive fix for all remaining encoding issues
fixes = [
    # Malta - fix "ă wann" -> "Ġwann" (the character might have different spacing)
    (r'San\s+ă\s+wann', 'San Ġwann'),
    ('ă wann', 'Ġwann'),
    
    # Norway
    ('Őlesund', 'Ålesund'),
    
    # Hungary
    ("GyŐ'r", 'Győr'),
    
    # Croatian/Serbian/Bosnian cities - fix remaining issues
    ('Ő ibenik', 'Šibenik'),
    ('Ő abac', 'Šabac'),
    ('Ő kofja Loka', 'Škofja Loka'),
    ('Ő tip', 'Štip'),
    ('Pană evo', 'Pančevo'),
    ('ăŒaă ak', 'Čačak'),
    ('Trenă in', 'Trenčín'),
    ('Bră ko', 'Brčko'),
    ('Gradaă ac', 'Gradačac'),
    ('Koă ani', 'Kočani'),
    ('Kiă evo', 'Kičevo'),
    
    # Albania
    ('DurrŰ«s', 'Durrës'),
    ('VlorŰ«', 'Vlorë'),
    ('ShkodŰ«r', 'Shkodër'),
    ('KorŰ§Ű«', 'Korçë'),
    ('KavajŰ«', 'Kavajë'),
    ('GjirokastŰ«r', 'Gjirokastër'),
    ('SarandŰ«', 'Sarandë'),
    ('LushnjŰ«', 'Lushnjë'),
    ('LezhŰ«', 'Lezhë'),
    ('KukŰ«s', 'Kukës'),
    
    # Lithuania
    ('Klaipă—da', 'Klaipėda'),
    ('Ő iauliai', 'Šiauliai'),
    ('Panevă—Ő¾ys', 'Panevėžys'),
    ('Marijampolă—', 'Marijampolė'),
    ('MaŐ¾eikiai', 'Mažeikiai'),
    ('Kă—dainiai', 'Kėdainiai'),
    ('Tauragă—', 'Tauragė'),
    ('Ukmergă—', 'Ukmergė'),
    ('Plungă—', 'Plungė'),
    
    # Latvia
    ('Liepă ja', 'Liepāja'),
    ('JŐ«rmala', 'Jūrmala'),
    ('Ră"zekne', 'Rēzekne'),
    ('Jă"kabpils', 'Jēkabpils'),
    ('Că"sis', 'Cēsis'),
    ('Kuldă«ga', 'Kuldīga'),
    
    # Estonia
    ('VŰµru', 'Võru'),
    ('JŰµhvi', 'Jõhvi'),
    
    # Central Asia
    ('Ű–zgön', 'Özgön'),
    ('Ű–lgii', 'Ölgii'),
    ('DaŐŸoguz', 'Daşoguz'),
    ('KöneürgenŰ§', 'Köneürgenç'),
    ('TürkmenbaŐŸy', 'Türkmenbaşy'),
    
    # Portuguese - fix all SŰ£o patterns
    ('SŰ£o Tomé', 'São Tomé'),
    ('SŰ£o Lázaro', 'São Lázaro'),
    ('SŰ£o LourenŰ§o', 'São Lourenço'),
    ('SŰ£o JoŰ£o', 'São João'),
    ('SŰ£o Domingos', 'São Domingos'),
    ('SŰ£o Filipe', 'São Filipe'),
    ('SŰ£o Paulo', 'São Paulo'),
    ('SŰ£o Pedro', 'São Pedro'),
    ('SŰ£o José', 'São José'),
    ('BissorŰ£', 'Bissorã'),
    ('MansŰ´a', 'Mansôa'),
    ('Ű'gua Grande', 'Água Grande'),
    ('Ű'vila', 'Ávila'),
    
    # North African
    ('Sidi Bel AbbŰ¨s', 'Sidi Bel Abbès'),
    ('BéjaŰ¯a', 'Béjaïa'),
    ('GabŰ¨s', 'Gabès'),
    ('ThiŰ¨s', 'Thiès'),
    ('RiviŰ¨re SŰ¨che', 'Rivière Sèche'),
    ('RiviŰ¨re du Rempart', 'Rivière du Rempart'),
    
    # Caribbean
    ('Cap-HaŰ¯tien', 'Cap-Haïtien'),
    ('GonaŰ¯ves', 'Gonaïves'),
    ('MiragoŰ¢ne', 'Miragoâne'),
    
    # Pacific
    ('PaŰ¯ta', 'Païta'),
    ('HouaŰ¯lou', 'Houaïlou'),
    ('HienghŰ¨ne', 'Hienghène'),
    ('LiquiŰ§á', 'Liquiçá'),
    
    # Other
    ('MariŰ«nburg', 'Mariënburg'),
    ('TŰ´lanaro', 'Tôlanaro'),
    ('CittŰ  di San Marino', 'Città di San Marino'),
    ('Sant JuliŰ  de LŰ²ria', 'Sant Julià de Lòria'),
    ('DeŰ§an', 'Deçan'),
    ('Chișinăƒu', 'Chișinău'),
    ('Băƒlți', 'Bălți'),
    ('RŰ®bnița', 'Rîbnița'),
    ('Dubăƒsari', 'Dubăsari'),
    ('CeadŰ®r-Lunga', 'Ceadîr-Lunga'),
    ('Străƒșeni', 'Strășeni'),
    ('Căƒușeni', 'Căușeni'),
    ('Edineț', 'Edineț'),
    ('Ű'emby', 'Ñemby'),
]

# Apply fixes - handle regex patterns separately
for old, new in fixes:
    if old.startswith('r'):
        # It's a regex pattern
        content = re.sub(old[1:], new, content)  # Remove the 'r' prefix
    else:
        content = content.replace(old, new)

# Fix remaining patterns that might need regex
content = re.sub(r'ă\s+wann', 'Ġwann', content)

# Save
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed all encoding issues!")
