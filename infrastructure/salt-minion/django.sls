django:
  pip.installed:
    - name: django >= 1.8
    - require:
      - pkg: python-pip
