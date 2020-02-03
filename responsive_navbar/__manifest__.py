# -*- coding: utf-8 -*-
{
    'name': "Responsive Navbar",

    'summary': """
        Responsive Navbar
        """,

    'description': """
        Makes navbar hide extra menus inside a dropdoen list when space is not available.
    """,

    'author': "Aktiv Software",
    'website': "http://www.aktivsoftware.com",
    'category': 'Website',
    'version': '10.0.1.0.0',
    'license': "AGPL-3",

    # any module necessary for this one to work correctly
    'depends': ['base', 'website'],

    # always loaded
    'data': [
        'data/layout_menu_inherited.xml',
        'views/assets.xml',
    ],
    'images': [
        'static/description/banner.jpg',
    ],
    'installable': True,
    'application': True,
    'auto_install': False,
}
