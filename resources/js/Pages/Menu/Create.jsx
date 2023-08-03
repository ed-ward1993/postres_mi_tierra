import React, {useEffect, useState} from "react";
import {Head, Link, useForm} from "@inertiajs/react";
import DynamicSelect from "@/Components/DynamicSelect";
import DynamicTreeSelect from "@/Components/DynamicTreeSelect";


export default function Create ({ auth }) {
    const { data, setData, errors, post } = useForm({
        title: "",
        type: 1,
        uri: "",
        parent_id: "0",
        target: "_self",
        icon: "",
        method: "GET",
        roles: [],
    });

    const typeOptions = [
        {id: 1, title: 'Ruta Interna'},
        {id: 2, title: 'Menú Interno'},
        {id: 3, title: 'Menú Externo'},
    ]

    const typeTargets = [
        {id: '_self',title: 'Mismo destino'},
        {id: '_top',title: 'Ventana Padre'},
        {id: '_blank',title: 'Ventana Energente'},
    ]

    const typeMethods = [
        {id: 'GET',title: 'GET'},
        {id: 'POST',title: 'POST'},
        {id: 'PUT',title: 'PUT'},
        {id: 'DELETE',title: 'DELETE'},
    ]

    const iconList =  [
        { id: 'fa-solid fa-align-left',  name: 'align-left' },
        { id: 'fa-solid fa-align-right',  name: 'align-right' },
        { id: 'fa-brands fa-amazon',  name: 'amazon' },
        { id: 'fa-solid fa-ambulance',  name: 'ambulance' },
        { id: 'fa-solid fa-anchor',  name: 'anchor' },
        { id: 'fa-brands fa-android',  name: 'android' },
        { id: 'fa-brands fa-angellist',  name: 'angellist' },
        { id: 'fa-solid fa-angle-double-down',  name: 'angle-double-down' },
        { id: 'fa-solid fa-angle-double-left',  name: 'angle-double-left' },
        { id: 'fa-solid fa-angle-double-right',  name: 'angle-double-right' },
        { id: 'fa-solid fa-angle-double-up',  name: 'angle-double-up' },
        { id: 'fa-solid fa-angle-left',  name: 'angle-left' },
        { id: 'fa-solid fa-angle-right',  name: 'angle-right' },
        { id: 'fa-solid fa-angle-up',  name: 'angle-up' },
        { id: 'fa-brands fa-apple',  name: 'apple' },
        { id: 'fa-solid fa-archive',  name: 'archive' },
        { id: 'fa-solid fa-area-chart',  name: 'area-chart' },
        { id: 'fa-regular fa-arrow-alt-circle-down',  name: 'arrow-alt-circle-down' },
        { id: 'fa-regular fa-arrow-alt-circle-left',  name: 'arrow-alt-circle-left' },
        { id: 'fa-regular fa-arrow-alt-circle-right',  name: 'arrow-alt-circle-right' },
        { id: 'fa-regular fa-arrow-alt-circle-up',  name: 'arrow-alt-circle-up' },
        { id: 'fa-solid fa-arrow-circle-down',  name: 'arrow-circle-down' },
        { id: 'fa-solid fa-arrow-circle-left',  name: 'arrow-circle-left' },
        { id: 'fa-solid fa-arrow-circle-right',  name: 'arrow-circle-right' },
        { id: 'fa-solid fa-arrow-circle-up',  name: 'arrow-circle-up' },
        { id: 'fa-solid fa-arrow-down',  name: 'arrow-down' },
        { id: 'fa-solid fa-arrow-left',  name: 'arrow-left' },
        { id: 'fa-solid fa-arrow-right',  name: 'arrow-right' },
        { id: 'fa-solid fa-arrow-up',  name: 'arrow-up' },
        { id: 'fa-solid fa-arrows',  name: 'arrows' },
        { id: 'fa-solid fa-arrows-alt',  name: 'arrows-alt' },
        { id: 'fa-solid fa-arrows-h',  name: 'arrows-h' },
        { id: 'fa-solid fa-arrows-v',  name: 'arrows-v' },
        { id: 'fa-solid fa-asterisk',  name: 'asterisk' },
        { id: 'fa-solid fa-at',  name: 'at' },
        { id: 'fa-solid fa-automobile',  name: 'automobile' },
        { id: 'fa-solid fa-backward',  name: 'backward' },
        { id: 'fa-solid fa-balance-scale',  name: 'balance-scale' },
        { id: 'fa-solid fa-ban',  name: 'ban' },
        { id: 'fa-solid fa-bank',  name: 'bank' },
        { id: 'fa-solid fa-bar-chart',  name: 'bar-chart' },
        { id: 'fa-regular fa-bar-chart',  name: 'bar-chart-regular' },
        { id: 'fa-solid fa-bars',  name: 'bars' },
        { id: 'fa-solid fa-bars-progress',  name: 'bars-progress' },
        { id: 'fa-solid fa-bars-staggered',  name: 'bars-staggered' },
        { id: 'fa-solid fa-battery-empty',  name: 'battery-empty' },
        { id: 'fa-solid fa-battery-full',  name: 'battery-full' },
        { id: 'fa-solid fa-battery-half',  name: 'battery-half' },
        { id: 'fa-solid fa-battery-quarter',  name: 'battery-quarter' },
        { id: 'fa-solid fa-battery-three-quarters',  name: 'battery-three-quarters' },
        { id: 'fa-solid fa-beer',  name: 'beer' },
        { id: 'fa-brands fa-behance',  name: 'behance' },
        { id: 'fa-brands fa-behance-square',  name: 'behance-square' },
        { id: 'fa-solid fa-bell',  name: 'bell' },
        { id: 'fa-regular fa-bell',  name: 'bell-regular' },
        { id: 'fa-solid fa-bell-slash',  name: 'bell-slash' },
        { id: 'fa-regular fa-bell-slash',  name: 'bell-slash-regular' },
        { id: 'fa-solid fa-bicycle',  name: 'bicycle' },
        { id: 'fa-solid fa-binoculars',  name: 'binoculars' },
        { id: 'fa-solid fa-birthday-cake',  name: 'birthday-cake' },
        { id: 'fa-brands fa-bitbucket',  name: 'bitbucket' },
        { id: 'fa-brands fa-bitcoin',  name: 'bitcoin' },
        { id: 'fa-brands fa-black-tie',  name: 'black-tie' },
        { id: 'fa-solid fa-bold',  name: 'bold' },
        { id: 'fa-solid fa-bolt',  name: 'bolt' },
        { id: 'fa-solid fa-bomb',  name: 'bomb' },
        { id: 'fa-solid fa-book',  name: 'book' },
        { id: 'fa-solid fa-book-atlas',  name: 'book-atlas' },
        { id: 'fa-solid fa-bookmark',  name: 'bookmark' },
        { id: 'fa-regular fa-bookmark',  name: 'bookmark-regular' },
        { id: 'fa-solid fa-briefcase',  name: 'briefcase' },
        { id: 'fa-brands fa-btc',  name: 'btc' },
        { id: 'fa-solid fa-bug',  name: 'bug' },
        { id: 'fa-solid fa-building',  name: 'building' },
        { id: 'fa-regular fa-building',  name: 'building-regular' },
        { id: 'fa-solid fa-bullhorn',  name: 'bullhorn' },
        { id: 'fa-solid fa-bullseye',  name: 'bullseye' },
        { id: 'fa-solid fa-bus',  name: 'bus' },
        { id: 'fa-solid fa-cab',  name: 'cab' },
        { id: 'fa-solid fa-calendar',  name: 'calendar' },
        { id: 'fa-solid fa-camera',  name: 'camera' },
        { id: 'fa-solid fa-car',  name: 'car' },
        { id: 'fa-solid fa-caret-down',  name: 'caret-down' },
        { id: 'fa-solid fa-caret-left',  name: 'caret-left' },
        { id: 'fa-solid fa-caret-right',  name: 'caret-right' },
        { id: 'fa-solid fa-caret-up',  name: 'caret-up' },
        { id: 'fa-solid fa-cart-plus',  name: 'cart-plus' },
        { id: 'fa-brands fa-cc-amex',  name: 'cc-amex' },
        { id: 'fa-brands fa-cc-jcb',  name: 'cc-jcb' },
        { id: 'fa-brands fa-cc-mastercard',  name: 'cc-mastercard' },
        { id: 'fa-brands fa-cc-paypal',  name: 'cc-paypal' },
        { id: 'fa-brands fa-cc-stripe',  name: 'cc-stripe' },
        { id: 'fa-brands fa-cc-visa',  name: 'cc-visa' },
        { id: 'fa-solid fa-chain',  name: 'chain' },
        { id: 'fa-solid fa-check',  name: 'check' },
        { id: 'fa-solid fa-chevron-down',  name: 'chevron-down' },
        { id: 'fa-solid fa-chevron-left',  name: 'chevron-left' },
        { id: 'fa-solid fa-chevron-right',  name: 'chevron-right' },
        { id: 'fa-solid fa-chevron-up',  name: 'chevron-up' },
        { id: 'fa-solid fa-child',  name: 'child' },
        { id: 'fa-brands fa-chrome',  name: 'chrome' },
        { id: 'fa-solid fa-circle',  name: 'circle' },
        { id: 'fa-regular fa-circle',  name: 'circle-regular' },
        { id: 'fa-solid fa-circle-notch',  name: 'circle-notch' },
        { id: 'fa-solid fa-circle-xmark',  name: 'circle-xmark' },
        { id: 'fa-regular fa-circle-xmark',  name: 'circle-xmark-regular' },
        { id: 'fa-solid fa-clipboard',  name: 'clipboard' },
        { id: 'fa-solid fa-clock',  name: 'clock' },
        { id: 'fa-regular fa-clock',  name: 'clock-regular' },
        { id: 'fa-solid fa-clone',  name: 'clone' },
        { id: 'fa-solid fa-close',  name: 'close' },
        { id: 'fa-solid fa-cloud',  name: 'cloud' },
        { id: 'fa-solid fa-cloud-download',  name: 'cloud-download' },
        { id: 'fa-solid fa-cloud-upload',  name: 'cloud-upload' },
        { id: 'fa-solid fa-cny',  name: 'cny' },
        { id: 'fa-solid fa-code',  name: 'code' },
        { id: 'fa-solid fa-code-fork',  name: 'code-fork' },
        { id: 'fa-brands fa-codepen',  name: 'codepen' },
        { id: 'fa-solid fa-coffee',  name: 'coffee' },
        { id: 'fa-solid fa-cog',  name: 'cog' },
        { id: 'fa-solid fa-cogs',  name: 'cogs' },
        { id: 'fa-solid fa-columns',  name: 'columns' },
        { id: 'fa-solid fa-comment',  name: 'comment' },
        { id: 'fa-regular fa-comment',  name: 'comment-regular' },
        { id: 'fa-solid fa-commenting',  name: 'commenting' },
        { id: 'fa-regular fa-commenting',  name: 'commenting-regular' },
        { id: 'fa-solid fa-comments',  name: 'comments' },
        { id: 'fa-regular fa-comments',  name: 'comments-regular' },
        { id: 'fa-solid fa-compass',  name: 'compass' },
        { id: 'fa-solid fa-compress',  name: 'compress' },
        { id: 'fa-brands fa-connectdevelop',  name: 'connectdevelop' },
        { id: 'fa-brands fa-contao',  name: 'contao' },
        { id: 'fa-solid fa-copy',  name: 'copy' },
        { id: 'fa-solid fa-copyright',  name: 'copyright' },
        { id: 'fa-solid fa-creative-commons',  name: 'creative-commons' },
        { id: 'fa-solid fa-credit-card',  name: 'credit-card' },
        { id: 'fa-solid fa-crop',  name: 'crop' },
        { id: 'fa-solid fa-crosshairs',  name: 'crosshairs' },
        { id: 'fa-brands fa-css3',  name: 'css3' },
        { id: 'fa-solid fa-cube',  name: 'cube' },
        { id: 'fa-solid fa-cubes',  name: 'cubes' },
        { id: 'fa-solid fa-cut',  name: 'cut' },
        { id: 'fa-solid fa-cutlery',  name: 'cutlery' },
        { id: 'fa-solid fa-dashboard',  name: 'dashboard' },
        { id: 'fa-brands fa-dashcube',  name: 'dashcube' },
        { id: 'fa-solid fa-database',  name: 'database' },
        { id: 'fa-solid fa-dedent',  name: 'dedent' },
        { id: 'fa-brands fa-delicious',  name: 'delicious' },
        { id: 'fa-solid fa-desktop',  name: 'desktop' },
        { id: 'fa-brands fa-deviantart',  name: 'deviantart' },
        { id: 'fa-solid fa-diamond',  name: 'diamond' },
        { id: 'fa-brands fa-digg',  name: 'digg' },
        { id: 'fa-solid fa-dollar',  name: 'dollar' },
        { id: 'fa-solid fa-download',  name: 'download' },
        { id: 'fa-brands fa-dribbble',  name: 'dribbble' },
        { id: 'fa-brands fa-dropbox',  name: 'dropbox' },
        { id: 'fa-brands fa-drupal',  name: 'drupal' },
        { id: 'fa-solid fa-earth-africa',  name: 'earth-africa' },
        { id: 'fa-solid fa-earth-americas',  name: 'earth-americas' },
        { id: 'fa-solid fa-earth-asia',  name: 'earth-asia' },
        { id: 'fa-solid fa-earth-europe',  name: 'earth-europe' },
        { id: 'fa-solid fa-earth-oceania',  name: 'earth-oceania' },
        { id: 'fa-brands fa-edge',  name: 'edge' },
        { id: 'fa-brands fa-edge-legacy',  name: 'edge-legacy' },
        { id: 'fa-solid fa-edit',  name: 'edit' },
        { id: 'fa-solid fa-eject',  name: 'eject' },
        { id: 'fa-solid fa-ellipsis-h',  name: 'ellipsis-h' },
        { id: 'fa-solid fa-ellipsis-v',  name: 'ellipsis-v' },
        { id: 'fa-brands fa-empire',  name: 'empire' },
        { id: 'fa-solid fa-envelope',  name: 'envelope' },
        { id: 'fa-regular fa-envelope',  name: 'envelope-regular' },
        { id: 'fa-solid fa-eur',  name: 'eur' },
        { id: 'fa-solid fa-euro',  name: 'euro' },
        { id: 'fa-solid fa-exchange',  name: 'exchange' },
        { id: 'fa-solid fa-exclamation',  name: 'exclamation' },
        { id: 'fa-solid fa-exclamation-circle',  name: 'exclamation-circle' },
        { id: 'fa-solid fa-exclamation-triangle',  name: 'exclamation-triangle' },
        { id: 'fa-solid fa-expand',  name: 'expand' },
        { id: 'fa-brands fa-expeditedssl',  name: 'expeditedssl' },
        { id: 'fa-solid fa-external-link',  name: 'external-link' },
        { id: 'fa-solid fa-external-link-square',  name: 'external-link-square' },
        { id: 'fa-solid fa-eye',  name: 'eye' },
        { id: 'fa-solid fa-eye-slash',  name: 'eye-slash' },
        { id: 'fa-solid fa-eyedropper',  name: 'eyedropper' },
        { id: 'fa-solid fa-face-meh',  name: 'face-meh' },
        { id: 'fa-regular fa-face-meh',  name: 'face-meh-regular' },
        { id: 'fa-brands fa-facebook',  name: 'facebook' },
        { id: 'fa-brands fa-facebook-f',  name: 'facebook-f' },
        { id: 'fa-brands fa-facebook-messenger',  name: 'facebook-messenger' },
        { id: 'fa-brands fa-facebook-square',  name: 'facebook-square' },
        { id: 'fa-solid fa-fast-backward',  name: 'fast-backward' },
        { id: 'fa-solid fa-fast-forward',  name: 'fast-forward' },
        { id: 'fa-solid fa-fax',  name: 'fax' },
        { id: 'fa-solid fa-feed',  name: 'feed' },
        { id: 'fa-solid fa-female',  name: 'female' },
        { id: 'fa-solid fa-fighter-jet',  name: 'fighter-jet' },
        { id: 'fa-solid fa-file',  name: 'file' },
        { id: 'fa-solid fa-file-archive',  name: 'file-archive' },
        { id: 'fa-regular fa-file-archive',  name: 'file-archive-regular' },
        { id: 'fa-solid fa-file-audio',  name: 'file-audio' },
        { id: 'fa-regular fa-file-audio',  name: 'file-audio-regular' },
        { id: 'fa-solid fa-file-code',  name: 'file-code' },
        { id: 'fa-regular fa-file-code',  name: 'file-code-regular' },
        { id: 'fa-solid fa-file-excel',  name: 'file-excel' },
        { id: 'fa-regular fa-file-excel',  name: 'file-excel-regular' },
        { id: 'fa-solid fa-file-image',  name: 'file-image' },
        { id: 'fa-regular fa-file-image',  name: 'file-image' },
        { id: 'fa-solid fa-file-lines',  name: 'file-lines' },
        { id: 'fa-regular fa-file-lines',  name: 'file-lines-regular' },
        { id: 'fa-solid fa-file-pdf',  name: 'file-pdf' },
        { id: 'fa-regular fa-file-pdf',  name: 'file-pdf-regular' },
        { id: 'fa-solid fa-file-powerpoint',  name: 'file-powerpoint' },
        { id: 'fa-regular fa-file-powerpoint',  name: 'file-powerpoint-regular' },
        { id: 'fa-regular fa-file',  name: 'file-regular' },
        { id: 'fa-solid fa-file-text',  name: 'file-text' },
        { id: 'fa-regular fa-file-text',  name: 'file-text-regular' },
        { id: 'fa-solid fa-file-video',  name: 'file-video' },
        { id: 'fa-regular fa-file-video',  name: 'file-video-regular' },
        { id: 'fa-solid fa-file-word',  name: 'file-word' },
        { id: 'fa-regular fa-file-word',  name: 'file-word-regular' },
        { id: 'fa-solid fa-film',  name: 'film' },
        { id: 'fa-solid fa-filter',  name: 'filter' },
        { id: 'fa-solid fa-fire',  name: 'fire' },
        { id: 'fa-solid fa-fire-extinguisher',  name: 'fire-extinguisher' },
        { id: 'fa-brands fa-firefox',  name: 'firefox' },
        { id: 'fa-brands fa-firefox-browser',  name: 'firefox-browser' },
        { id: 'fa-solid fa-flag',  name: 'flag' },
        { id: 'fa-solid fa-flag-checkered',  name: 'flag-checkered' },
        { id: 'fa-regular fa-flag',  name: 'flag-regular' },
        { id: 'fa-solid fa-flask',  name: 'flask' },
        { id: 'fa-solid fa-flask-vial',  name: 'flask-vial' },
        { id: 'fa-brands fa-flickr',  name: 'flickr' },
        { id: 'fa-solid fa-floppy-disk',  name: 'floppy-disk' },
        { id: 'fa-regular fa-floppy-disk',  name: 'floppy-disk-regular' },
        { id: 'fa-solid fa-folder',  name: 'folder' },
        { id: 'fa-regular fa-folder',  name: 'folder-regular' },
        { id: 'fa-solid fa-folder-open',  name: 'folder-open' },
        { id: 'fa-regular fa-folder-open',  name: 'folder-open-regular' },
        { id: 'fa-solid fa-font',  name: 'font' },
        { id: 'fa-brands fa-fonticons',  name: 'fonticons' },
        { id: 'fa-brands fa-fonticons-fi',  name: 'fonticons-fi' },
        { id: 'fa-brands fa-forumbee',  name: 'forumbee' },
        { id: 'fa-solid fa-forward',  name: 'forward' },
        { id: 'fa-brands fa-foursquare',  name: 'foursquare' },
        { id: 'fa-solid fa-frown',  name: 'frown' },
        { id: 'fa-regular fa-frown',  name: 'frown-regular' },
        { id: 'fa-solid fa-futbol',  name: 'futbol' },
        { id: 'fa-solid fa-gamepad',  name: 'gamepad' },
        { id: 'fa-solid fa-gavel',  name: 'gavel' },
        { id: 'fa-solid fa-gbp',  name: 'gbp' },
        { id: 'fa-solid fa-gear',  name: 'gear' },
        { id: 'fa-solid fa-gears',  name: 'gears' },
        { id: 'fa-solid fa-genderless',  name: 'genderless' },
        { id: 'fa-brands fa-get-pocket',  name: 'get-pocket' },
        { id: 'fa-brands fa-gg',  name: 'gg' },
        { id: 'fa-brands fa-gg-circle',  name: 'gg-circle' },
        { id: 'fa-solid fa-gift',  name: 'gift' },
        { id: 'fa-brands fa-git',  name: 'git' },
        { id: 'fa-brands fa-git-square',  name: 'git-square' },
        { id: 'fa-brands fa-github',  name: 'github' },
        { id: 'fa-brands fa-github-alt',  name: 'github-alt' },
        { id: 'fa-brands fa-github-square',  name: 'github-square' },
        { id: 'fa-solid fa-glasses',  name: 'glasses' },
        { id: 'fa-solid fa-globe',  name: 'globe' },
        { id: 'fa-brands fa-google',  name: 'google' },
        { id: 'fa-brands fa-google-plus',  name: 'google-plus' },
        { id: 'fa-brands fa-google-plus-square',  name: 'google-plus-square' },
        { id: 'fa-brands fa-google-plus-g',  name: 'google-plus-g' },
        { id: 'fa-brands fa-google-wallet',  name: 'google-wallet' },
        { id: 'fa-solid fa-graduation-cap',  name: 'graduation-cap' },
        { id: 'fa-brands fa-gratipay',  name: 'gratipay' },
        { id: 'fa-solid fa-h-square',  name: 'h-square' },
        { id: 'fa-brands fa-hacker-news',  name: 'hacker-news' },
        { id: 'fa-solid fa-hand',  name: 'hand' },
        { id: 'fa-solid fa-hand-lizard',  name: 'hand-lizard' },
        { id: 'fa-solid fa-hand-paper',  name: 'hand-paper' },
        { id: 'fa-solid fa-hand-peace',  name: 'hand-peace' },
        { id: 'fa-solid fa-hand-point-down',  name: 'hand-point-down' },
        { id: 'fa-solid fa-hand-point-left',  name: 'hand-point-left' },
        { id: 'fa-solid fa-hand-point-right',  name: 'hand-point-right' },
        { id: 'fa-solid fa-hand-point-up',  name: 'hand-point-up' },
        { id: 'fa-solid fa-hand-pointer',  name: 'hand-pointer' },
        { id: 'fa-solid fa-hand-scissors',  name: 'hand-scissors' },
        { id: 'fa-solid fa-hand-spock',  name: 'hand-spock' },
        { id: 'fa-solid fa-hashtag',  name: 'hashtag' },
        { id: 'fa-solid fa-hdd',  name: 'hdd' },
        { id: 'fa-solid fa-header',  name: 'header' },
        { id: 'fa-solid fa-headphones',  name: 'headphones' },
        { id: 'fa-solid fa-heart',  name: 'heart' },
        { id: 'fa-regular fa-heart',  name: 'heart-regular' },
        { id: 'fa-solid fa-heartbeat',  name: 'heartbeat' },
        { id: 'fa-solid fa-history',  name: 'history' },
        { id: 'fa-solid fa-home',  name: 'home' },
        { id: 'fa-solid fa-hospital',  name: 'hospital' },
        { id: 'fa-solid fa-hospital-symbol',  name: 'hospital-symbol' },
        { id: 'fa-solid fa-hospital-user',  name: 'hospital-user' },
        { id: 'fa-solid fa-hotel',  name: 'hotel' },
        { id: 'fa-solid fa-hourglass',  name: 'hourglass' },
        { id: 'fa-solid fa-hourglass-1',  name: 'hourglass-1' },
        { id: 'fa-solid fa-hourglass-2',  name: 'hourglass-2' },
        { id: 'fa-solid fa-hourglass-3',  name: 'hourglass-3' },
        { id: 'fa-solid fa-hourglass-end',  name: 'hourglass-end' },
        { id: 'fa-solid fa-hourglass-half',  name: 'hourglass-half' },
        { id: 'fa-regular fa-hourglass',  name: 'hourglass-regular' },
        { id: 'fa-solid fa-hourglass-start',  name: 'hourglass-start' },
        { id: 'fa-solid fa-house',  name: 'house' },
        { id: 'fa-solid fa-house-lock',  name: 'house-lock' },
        { id: 'fa-brands fa-houzz',  name: 'houzz' },
        { id: 'fa-brands fa-html5',  name: 'html5' },
        { id: 'fa-solid fa-i-cursor',  name: 'i-cursor' },
        { id: 'fa-solid fa-ils',  name: 'ils' },
        { id: 'fa-solid fa-image',  name: 'image' },
        { id: 'fa-solid fa-images',  name: 'images' },
        { id: 'fa-solid fa-inbox',  name: 'inbox' },
        { id: 'fa-solid fa-indent',  name: 'indent' },
        { id: 'fa-solid fa-industry',  name: 'industry' },
        { id: 'fa-solid fa-info',  name: 'info' },
        { id: 'fa-solid fa-info-circle',  name: 'info-circle' },
        { id: 'fa-solid fa-inr',  name: 'inr' },
        { id: 'fa-brands fa-instagram',  name: 'instagram' },
        { id: 'fa-brands fa-instagram-square',  name: 'instagram-square' },
        { id: 'fa-solid fa-institution',  name: 'institution' },
        { id: 'fa-brands fa-internet-explorer',  name: 'internet-explorer' },
        { id: 'fa-brands fa-ioxhost',  name: 'ioxhost' },
        { id: 'fa-solid fa-italic',  name: 'italic' },
        { id: 'fa-brands fa-joomla',  name: 'joomla' },
        { id: 'fa-solid fa-jpy',  name: 'jpy' },
        { id: 'fa-solid fa-jsfiddle',  name: 'jsfiddle' },
        { id: 'fa-solid fa-key',  name: 'key' },
        { id: 'fa-solid fa-keyboard',  name: 'keyboard' },
        { id: 'fa-regular fa-keyboard',  name: 'keyboard-regular' },
        { id: 'fa-solid fa-krw',  name: 'krw' },
        { id: 'fa-solid fa-language',  name: 'language' },
        { id: 'fa-solid fa-laptop',  name: 'laptop' },
        { id: 'fa-brands fa-lastfm',  name: 'lastfm' },
        { id: 'fa-brands fa-lastfm-square',  name: 'lastfm-square' },
        { id: 'fa-solid fa-leaf',  name: 'leaf' },
        { id: 'fa-brands fa-leanpub',  name: 'leanpub' },
        { id: 'fa-solid fa-legal',  name: 'legal' },
        { id: 'fa-solid fa-lemon',  name: 'lemon' },
        { id: 'fa-regular fa-lemon',  name: 'lemon-regular' },
        { id: 'fa-solid fa-level-down',  name: 'level-down' },
        { id: 'fa-solid fa-level-up',  name: 'level-up' },
        { id: 'fa-solid fa-life-ring',  name: 'life-ring' },
        { id: 'fa-solid fa-lightbulb',  name: 'lightbulb' },
        { id: 'fa-regular fa-lightbulb',  name: 'lightbulb-regular' },
        { id: 'fa-solid fa-line-chart',  name: 'line-chart' },
        { id: 'fa-solid fa-link',  name: 'link' },
        { id: 'fa-brands fa-linkedin',  name: 'linkedin' },
        { id: 'fa-brands fa-linkedin-in',  name: 'linkedin-in' },
        { id: 'fa-brands fa-linux',  name: 'linux' },
        { id: 'fa-solid fa-list',  name: 'list' },
        { id: 'fa-solid fa-list-alt',  name: 'list-alt' },
        { id: 'fa-solid fa-list-ol',  name: 'list-ol' },
        { id: 'fa-solid fa-list-ul',  name: 'list-ul' },
        { id: 'fa-solid fa-location-arrow',  name: 'location-arrow' },
        { id: 'fa-solid fa-lock',  name: 'lock' },
        { id: 'fa-solid fa-lock-open',  name: 'lock-open' },
        { id: 'fa-solid fa-long-arrow-down',  name: 'long-arrow-down' },
        { id: 'fa-solid fa-long-arrow-left',  name: 'long-arrow-left' },
        { id: 'fa-solid fa-long-arrow-right',  name: 'long-arrow-right' },
        { id: 'fa-solid fa-long-arrow-up',  name: 'long-arrow-up' },
        { id: 'fa-solid fa-magic',  name: 'magic' },
        { id: 'fa-solid fa-magnet',  name: 'magnet' },
        { id: 'fa-solid fa-male',  name: 'male' },
        { id: 'fa-solid fa-mars',  name: 'mars' },
        { id: 'fa-solid fa-mars-stroke-v',  name: 'mars-stroke-v' },
        { id: 'fa-brands fa-maxcdn',  name: 'maxcdn' },
        { id: 'fa-brands fa-medium',  name: 'medium' },
        { id: 'fa-solid fa-medkit',  name: 'medkit' },
        { id: 'fa-solid fa-mercury',  name: 'mercury' },
        { id: 'fa-solid fa-microphone',  name: 'microphone' },
        { id: 'fa-solid fa-mobile',  name: 'mobile' },
        { id: 'fa-solid fa-motorcycle',  name: 'motorcycle' },
        { id: 'fa-solid fa-mouse-pointer',  name: 'mouse-pointer' },
        { id: 'fa-solid fa-music',  name: 'music' },
        { id: 'fa-solid fa-navicon',  name: 'navicon' },
        { id: 'fa-solid fa-neuter',  name: 'neuter' },
        { id: 'fa-solid fa-newspaper',  name: 'newspaper' },
        { id: 'fa-brands fa-opencart',  name: 'opencart' },
        { id: 'fa-brands fa-openid',  name: 'openid' },
        { id: 'fa-brands fa-opera',  name: 'opera' },
        { id: 'fa-solid fa-outdent',  name: 'outdent' },
        { id: 'fa-brands fa-pagelines',  name: 'pagelines' },
        { id: 'fa-solid fa-paper-plane',  name: 'paper-plane' },
        { id: 'fa-solid fa-paperclip',  name: 'paperclip' },
        { id: 'fa-solid fa-paragraph',  name: 'paragraph' },
        { id: 'fa-solid fa-paste',  name: 'paste' },
        { id: 'fa-solid fa-pause',  name: 'pause' },
        { id: 'fa-solid fa-paw',  name: 'paw' },
        { id: 'fa-brands fa-paypal',  name: 'paypal' },
        { id: 'fa-solid fa-pencil',  name: 'pencil' },
        { id: 'fa-solid fa-pencil-square',  name: 'pencil-square' },
        { id: 'fa-solid fa-person',  name: 'person' },
        { id: 'fa-solid fa-phone',  name: 'phone' },
        { id: 'fa-solid fa-photo-film',  name: 'photo-film' },
        { id: 'fa-solid fa-pie-chart',  name: 'pie-chart' },
        { id: 'fa-brands fa-pied-piper',  name: 'pied-piper' },
        { id: 'fa-brands fa-pied-piper-pp',  name: 'pied-piper-pp' },
        { id: 'fa-brands fa-pinterest',  name: 'pinterest' },
        { id: 'fa-brands fa-pinterest-p',  name: 'pinterest-p' },
        { id: 'fa-brands fa-pinterest-square',  name: 'pinterest-square' },
        { id: 'fa-solid fa-plane',  name: 'plane' },
        { id: 'fa-solid fa-play',  name: 'play' },
        { id: 'fa-solid fa-play-circle',  name: 'play-circle' },
        { id: 'fa-regular fa-play-circle',  name: 'play-circle-regular' },
        { id: 'fa-solid fa-plug',  name: 'plug' },
        { id: 'fa-solid fa-plus',  name: 'plus' },
        { id: 'fa-solid fa-plus-circle',  name: 'plus-circle' },
        { id: 'fa-solid fa-plus-square',  name: 'plus-square' },
        { id: 'fa-regular fa-plus-square',  name: 'plus-square-regular' },
        { id: 'fa-solid fa-power-off',  name: 'power-off' },
        { id: 'fa-solid fa-print',  name: 'print' },
        { id: 'fa-solid fa-puzzle-piece',  name: 'puzzle-piece' },
        { id: 'fa-brands fa-qq',  name: 'qq' },
        { id: 'fa-solid fa-qrcode',  name: 'qrcode' },
        { id: 'fa-solid fa-question',  name: 'question' },
        { id: 'fa-solid fa-question-circle',  name: 'question-circle' },
        { id: 'fa-solid fa-quote-left',  name: 'quote-left' },
        { id: 'fa-solid fa-quote-right',  name: 'quote-right' },
        { id: 'fa-solid fa-radiation',  name: 'radiation' },
        { id: 'fa-solid fa-random',  name: 'random' },
        { id: 'fa-brands fa-rebel',  name: 'rebel' },
        { id: 'fa-solid fa-recycle',  name: 'recycle' },
        { id: 'fa-brands fa-reddit',  name: 'reddit' },
        { id: 'fa-brands fa-reddit-square',  name: 'reddit-square' },
        { id: 'fa-solid fa-refresh',  name: 'refresh' },
        { id: 'fa-solid fa-registered',  name: 'registered' },
        { id: 'fa-solid fa-remove',  name: 'remove' },
        { id: 'fa-brands fa-renren',  name: 'renren' },
        { id: 'fa-solid fa-reorder',  name: 'reorder' },
        { id: 'fa-solid fa-repeat',  name: 'repeat' },
        { id: 'fa-solid fa-reply',  name: 'reply' },
        { id: 'fa-solid fa-reply-all',  name: 'reply-all' },
        { id: 'fa-solid fa-retweet',  name: 'retweet' },
        { id: 'fa-solid fa-rmb',  name: 'rmb' },
        { id: 'fa-solid fa-road',  name: 'road' },
        { id: 'fa-solid fa-rocket',  name: 'rocket' },
        { id: 'fa-solid fa-rotate-left',  name: 'rotate-left' },
        { id: 'fa-solid fa-rotate-right',  name: 'rotate-right' },
        { id: 'fa-solid fa-rouble',  name: 'rouble' },
        { id: 'fa-solid fa-rss',  name: 'rss' },
        { id: 'fa-solid fa-rss-square',  name: 'rss-square' },
        { id: 'fa-solid fa-rub',  name: 'rub' },
        { id: 'fa-solid fa-ruble',  name: 'ruble' },
        { id: 'fa-solid fa-rupee',  name: 'rupee' },
        { id: 'fa-brands fa-safari',  name: 'safari' },
        { id: 'fa-solid fa-signal',  name: 'signal' },
        { id: 'fa-solid fa-sign-in',  name: 'sign-in' },
        { id: 'fa-solid fa-sign-in-alt',  name: 'sign-in-alt' },
        { id: 'fa-solid fa-sign-out',  name: 'sign-out' },
        { id: 'fa-solid fa-sign-out-alt',  name: 'sign-out-alt' },
        { id: 'fa-solid fa-sliders',  name: 'sliders' },
        { id: 'fa-brands fa-slideshare',  name: 'slideshare' },
        { id: 'fa-solid fa-smile',  name: 'smile' },
        { id: 'fa-regular fa-smile',  name: 'smile-regular' },
        { id: 'fa-solid fa-sort-asc',  name: 'sort-asc' },
        { id: 'fa-solid fa-sort-desc',  name: 'sort-desc' },
        { id: 'fa-solid fa-sort-down',  name: 'sort-down' },
        { id: 'fa-solid fa-spinner',  name: 'spinner' },
        { id: 'fa-solid fa-spoon',  name: 'spoon' },
        { id: 'fa-brands fa-spotify',  name: 'spotify' },
        { id: 'fa-solid fa-square',  name: 'square' },
        { id: 'fa-regular fa-square',  name: 'square-regular' },
        { id: 'fa-solid fa-star',  name: 'star' },
        { id: 'fa-solid fa-star-half',  name: 'star-half' },
        { id: 'fa-regular fa-star-half',  name: 'star-half-regular' },
        { id: 'fa-regular fa-star',  name: 'star-regular' },
        { id: 'fa-solid fa-stethoscope',  name: 'stethoscope' },
        { id: 'fa-solid fa-stop',  name: 'stop' },
        { id: 'fa-solid fa-subscript',  name: 'subscript' },
        { id: 'fa-solid fa-tablet',  name: 'tablet' },
        { id: 'fa-solid fa-tachometer',  name: 'tachometer' },
        { id: 'fa-solid fa-tag',  name: 'tag' },
        { id: 'fa-solid fa-tags',  name: 'tags' },
        { id: 'fa-solid fa-thumbs-up',  name: 'thumbs-up' },
        { id: 'fa-solid fa-transgender',  name: 'transgender' },
        { id: 'fa-brands fa-twitter',  name: 'twitter' },
        { id: 'fa-brands fa-twitter-square',  name: 'twitter-square' },
        { id: 'fa-solid fa-user',  name: 'user' },
        { id: 'fa-regular fa-user',  name: 'user-regular' },
        { id: 'fa-solid fa-user-doctor',  name: 'user-doctor' },
        { id: 'fa-solid fa-user-group',  name: 'user-group' },
        { id: 'fa-solid fa-user-lock',  name: 'user-lock' },
        { id: 'fa-solid fa-venus',  name: 'venus' },
        { id: 'fa-brands fa-wordpress',  name: 'wordpress' },
        { id: 'fa-brands fa-youtube',  name: 'youtube' },
        { id: 'fa-brands fa-youtube-square',  name: 'youtube-square' },
    ];

    function handleSubmit(e) {
        e.preventDefault();
        post(route("menus.store"));
    }

    const getSelectedType = (selectedOption) => {
        setData("type", selectedOption.id);
    }

    const getSelectedTarget = (selectedOption) => {
        setData("target", selectedOption.id);
    }

    const getSelectedMethod = (selectedOption) => {
        setData("method", selectedOption.id);
    }

    const getSelectedParent = (selectedOption,treeOpitons) => {
        setData("parent_id", selectedOption.value);
    }

    const getSelectedRole = (selectedOption) => {
        setData("roles", selectedOption.map(item => item.id));
    }

    const getSelectedIcon = (selectedOption) => {
        setData("icon", selectedOption.id);
    }

    const getSelectedRoute = (selectedOption) => {
        setData("uri", selectedOption.id);
    }


    return (
        <>
            <Head title="Nuevo Menú" />
            <div>
                <div className="mx-auto my-2 px-4">
                    <div className="p-8 bg-white rounded shadow">
                        <form name="createForm" onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <div className="grid grid-cols-6 gap-3">
                                    <div className="col-span-3 lg:col-span-2">
                                        <div>
                                            <label>T&iacute;tulo</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2"
                                                label="Titulo"
                                                name="title"
                                                value={data.title}
                                                onChange={(e) =>
                                                    setData("title", e.target.value)
                                                }
                                            />
                                            <span className="text-red-600">
                                                {errors.title}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-3 lg:col-span-2">
                                        <div>
                                            <label>Tipo</label>
                                            <DynamicSelect
                                                multiple={false}
                                                options={typeOptions}
                                                value={data.type}
                                                valueKey="id"
                                                labelKey="title"
                                                onChange={getSelectedType}
                                            />
                                            <span className="text-red-600">
                                                {errors.type}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-3 lg:col-span-2">
                                        <div>
                                            <label>URL/Ruta</label>
                                            {data.type === 1 && (
                                                <DynamicSelect
                                                    urlRoute={"routes.index"}
                                                    multiple={false}
                                                    value={data.uri}
                                                    onChange={getSelectedRoute}
                                                />
                                            )}
                                            {data.type !== 1 && (
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-2"
                                                    label="URL/Ruta"
                                                    name="uri"
                                                    value={data.uri}
                                                    onChange={(e) =>
                                                        setData("uri", e.target.value)
                                                    }
                                                />
                                            )}
                                            <span className="text-red-600">
                                                {errors.uri}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-3 lg:col-span-2">
                                        <div>
                                            <label>Padre</label>
                                            <DynamicTreeSelect
                                                urlRoute={'menus.all'}
                                                labelKey="title"
                                                valueKey="id"
                                                mode="radioSelect"
                                                onChange={getSelectedParent}
                                                placeholder="Seleccione Padre"
                                                defaultValue={data.parent_id}
                                            />
                                            <span className="text-red-600">
                                                {errors.type}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-3 lg:col-span-2">
                                        <div>
                                            <label>Destino</label>
                                            <DynamicSelect
                                                multiple={false}
                                                options={typeTargets}
                                                value={data.target}
                                                valueKey="id"
                                                labelKey="title"
                                                onChange={getSelectedTarget}
                                            />
                                            <span className="text-red-600">
                                                {errors.type}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-3 lg:col-span-2">
                                        <div>
                                            <label>Icono</label>
                                            <DynamicSelect
                                                multiple={false}
                                                withIcons={true}
                                                options={iconList}
                                                value={data.icon}
                                                valueKey="id"
                                                labelKey="name"
                                                onChange={getSelectedIcon}
                                            />
                                            <span className="text-red-600">
                                                {errors.icon}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-3 lg:col-span-2">
                                        <div>
                                            <label>M&eacute;todo</label>
                                            <DynamicSelect
                                                multiple={false}
                                                options={typeMethods}
                                                value={data.method}
                                                valueKey="id"
                                                labelKey="title"
                                                onChange={getSelectedMethod}
                                            />
                                            <span className="text-red-600">
                                                {errors.method}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-3 lg:col-span-2">
                                        <label>Roles</label>
                                        <DynamicSelect urlRoute={"roles.all"} onChange={getSelectedRole} value={data.roles} multiple={true} labelKey={"name"} />
                                        <span className="text-red-600">
                                            {errors.roles}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between">
                                <button
                                    type="submit"
                                    className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                >
                                    Guardar
                                </button>
                                <Link
                                    href={route("menus.index")}
                                    className="px-4 py-2 text-white bg-red-500 rounded"
                                >
                                    Atrás
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
