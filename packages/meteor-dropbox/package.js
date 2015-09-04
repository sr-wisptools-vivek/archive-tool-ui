Package.describe({
    name: 'srwisptoolsvivek:meteor-dropbox',
    version: '0.0.1',
    summary: 'Dropbox authenticaion',
    git: '',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('0.9.4');
    api.use('oauth', ['client', 'server']);
    api.use('oauth2', ['client', 'server']);
    api.use('http', ['client', 'server']);
    api.use('templating', 'client');
    api.use('underscore', ['client', 'server']);
    api.use('service-configuration', ['client', 'server']);

    api.export('DropboxOAuth');

    api.addFiles(['meteor-dropbox-server.js', 'configuration.js'], 'server');
    api.addFiles('meteor-dropbox-client.js', 'client');
});