from setuptools import setup

setup(
    name='<%= title %>',
    packages=['<%= title %>'],
    include_package_data=True,
    install_requires=[
        'flask',
        'gunicorn',
    ],
)
