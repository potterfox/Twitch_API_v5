'use strict';

const request = require('./request');
const querystring = require('querystring');

module.exports = {
    getByName: (data, callback) => {
        // Authentication: none
        // Required Parameters: name
        // Optional Parameters: none

        if(!data.name) return callback('name is required');

        let params = {};
        params.name = data.name;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/communities?${querystring.stringify(params)}`;

        request('GET', options, callback);
    },

    getByID: (data, callback) => {
        // Authentication: none
        // Required Parameters: communityID
        // Optional Parameters: none

        if(!data.communityID) return callback('communityID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/communities/${data.communityID}`;

        request('GET', options, callback);
    },

    update: (data, callback) => {
        // Authentication: communities_edit
        // Required Parameters: communityID
        // Optional Parameters: summary, description, rules, email

        if(!data.auth) return callback('auth is required');
        if(!data.communityID) return callback('communityID is required');
        if(!data.summary && !data.description && !data.rules && !data.email) return callback('at least one of summary, description, rules or email is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/communities/${data.id}`;
        options.form = {};
        if(data.summary) options.form.summary = data.summary;
        if(data.description) options.form.description = data.description;
        if(data.rules) options.form.rules = data.rules;
        if(data.email) options.form.email = data.email;

        request('POST', options, callback);
    },

    top: (data, callback) => {
        // Authentication: none
        // Required Parameters: none
        // Optional Parameters: limit, cursor

        let params = {};
        if(data.limit) params.limit = data.limit;
        if(data.cursor) params.cursor = data.cursor;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/communities/top?${querystring.stringify(params)}`;

        request('GET', options, callback);
    },

    bans: (data, callback) => {
        // Authentication: communities_moderate
        // Required Parameters: communityID
        // Optional Parameters: limit, cursor

        if(!data.auth) return callback('auth is required');
        if(!data.communityID) return callback('communityID is required');

        let params = {};
        if(data.limit) params.limit = data.limit;
        if(data.cursor) params.cursor = data.cursor;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/communities/${data.communityID}/bans?${querystring.stringify(params)}`;

        request('GET', options, callback);
    },

    addBan: (data, callback) => {
        // Authentication: communities_moderate
        // Required Parameters: communityID, userID
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.communityID) return callback('communityID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/communities/${data.communityID}/bans/${data.userID}`;

        request('PUT', options, callback);
    },

    unban: (data, callback) => {
        // Authentication: communities_moderate
        // Required Parameters: communityID, userID
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.communityID) return callback('communityID is required');
        
        let options = {};
        options.url = `https://api.twitch.tv/kraken/communities/${data.communityID}/bans/${data.userID}`;

        request('DELETE', options, callback);
    },

    createAvatar: (data, callback) => {
        // Authentication: communities_edit
        // Required Parameters: communityID, avatar_image
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.communityID) return callback('communityID is required');
        if(!data.avatar_image) return callback('avatar_image is required - (base-64 encoded representation of the avatar image, must be 600 x 800 pixels)');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/communities/${data.communityID}/images/avatar`;
        options.form = {};
        options.form.avatar_image = data.avatar_image;

        request('POST', options, callback);
    },

    deleteAvatar: (data, callback) => {
        // Authentication: communities_edit
        // Required Parameters: communityID
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.communityID) return callback('communityID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/communities/${data.communityID}/images/avatar`;

        request('DELETE', options, callback);
    },

    createCover: (data, callback) => {
        // Authentication: communities_edit
        // Required Parameters: communityID, cover_image
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.communityID) return callback('communityID is required');
        if(!data.avatar_image) return callback('cover_image is required - (base-64 encoded representation of the avatar image, must be 1200 x 180 pixels)');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/communities/${data.communityID}/images/cover`;
        options.form = {};
        options.form.cover_image = data.cover_image;

        request('POST', options, callback);
    },

    deleteCover: (data, callback) => {
        // Authentication: communities_edit
        // Required Parameters: communityID
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.communityID) return callback('communityID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/communities/${data.communityID}/images/cover`;

        request('DELETE', options, callback);
    },

    mods: (data, callback) => {
        // Authentication: communities_edit
        // Required Parameters: communityID
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.communityID) return callback('communityID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/communities/${data.communityID}/moderators`;

        request('GET', options, callback);
    },

    addMod: (data, callback) => {
        // Authentication: communities_edit
        // Required Parameters: communityID, userID
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.communityID) return callback('communityID is required');      
        if(!data.userID) return callback('userID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/communities/${data.communityID}/moderators/${data.userID}`;

        request('PUT', options, callback);
    },

    delMod: (data, callback) => {
        // Authentication: communities_edit
        // Required Parameters: communityID, userID
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.communityID) return callback('communityID is required');      
        if(!data.userID) return callback('userID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/communities/${data.communityID}/moderators/${data.userID}`;

        request('DELETE', options, callback);
    },

    getPermissions: (data, callback) => {
        // Authentication: any
        // Required Parameters: communityID
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.communityID) return callback('communityID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/communities/${data.communityID}/permissions`;

        request('GET', options, callback);
    },

    report: (data, callback) => {
        // Authentication: none
        // Required Parameters: channelID, communityID
        // Optional Parameters: none

        if(!data.channelID) return callback('channelID is required');
        if(!data.communityID) return callback('communityID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/communities/${data.communityID}/report_channel`;
        options.form = {};
        options.form.channel_id = data.channelID;

        request('POST', options, callback);
    },

    timeouts: (data, callback) => {
        // Authentication: communities_moderate
        // Required Parameters: communityID
        // Optional Parameters: limit, cursor
        
        if(!data.auth) return callback('auth is required');
        if(!data.communityID) return callback('communityID is required');

        let params = {};
        if(data.limit) params.limit = data.limit;
        if(data.cursor) params.cursor = data.cursor;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/communities/${data.communityID}/timeouts`;

        request('GET', options, callback);
    },

    addTimeout: (data, callback) => {
        // Authentication: communities_moderate
        // Required Parameters: communityID, userID, duration
        // Optional Parameters: reason
        
        if(!data.auth) return callback('auth is required');
        if(!data.communityID) return callback('communityID is required');
        if(!data.userID) return callback('userID is required');
        if(!data.duration) return callback('duration is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/communities/${data.communityID}/timeouts/${data.userID}`;
        options.form = {};
        options.duration = data.duration;
        if(data.reason) options.reason = data.reason;

        request('GET', options, callback);
    },

    delTimeout: (data, callback) => {
        // Authentication: communities_moderate
        // Required Parameters: communityID, userID
        // Optional Parameters: none
        
        if(!data.auth) return callback('auth is required');
        if(!data.communityID) return callback('communityID is required');
        if(!data.userID) return callback('userID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/communities/${data.communityID}/timeouts/${data.userID}`;

        request('DELETE', options, callback);
    }
};