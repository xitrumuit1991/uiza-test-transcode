import { Router } from '@angular/router';
import { Component, Input, OnInit} from '@angular/core';
import { UserService } from 'src/app/@service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from './../../../../environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-uiza-player',
  styleUrls: ['./player.component.scss'],
  templateUrl: './player.component.html',
})

export class UizaPlayerComponent implements OnInit {
  /**
   * options is object, with keys:
   *  + includeJs (option): value be enum [true, false]
   *  + ratio (option): value be enum ["16:9", "4:3"]
   *  + streamType (require): value be enum ["vod", "live", "url"]
   *  + url (option): when streamType="url", url is the link play
   *  + entityId (require)
   *  + playerId (option)
   *  + streamName (require) when streamType="live",
   *  + region (require) when streamType="live"
   * */
  @Input() options: any;

  private DOMAIN_SDK;
  private DOMAIN_SDK_DEV = 'dev-sdk.uiza.io';
  private DOMAIN_SDK_STAG = 'stag-sdk.uiza.io';
  private DOMAIN_SDK_PROD = 'sdk.uiza.io';

  private templates: any = {
    'responsive': '<iframe id="iframe-{entityId}" width="100%" height="100%" src="{url}" frameborder="0" allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen"></iframe>',
    '16:9': '<div style="position: relative; display: block; max-width: 100%;"><div style="padding-bottom: 56.25%;"><iframe id="iframe-{entityId}" width="100%" height="100%" src="{url}" style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px;"frameborder="0" allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen"></iframe></div></div>',
    '4:3': '<div style="position: relative; display: block; max-width: 100%;"><div style="padding-bottom: 75%;"><iframe id="iframe-{entityId}" width="100%" height="100%" src="{url}" style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px;"frameborder="0" allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen"></iframe></div></div>'
  };

  public iframe;

  constructor(private router: Router,
              private sanitizer: DomSanitizer,
              private userService: UserService) { }

  ngOnInit() {
    this.detectOptions();
    const iframe = this.generateIframe();

    this.iframe = this.sanitizer.bypassSecurityTrustHtml(iframe);
  }

  generatePreviewUrl() {
    if (typeof this.options.appId === 'undefined') {
      this.detectOptions();
    }
    let url;

    if (typeof this.options.mode !== 'undefined' && this.options.mode === 'preview') {
      // url = `https://${this.DOMAIN_SDK}/#/preview/null/embed?iframeId=iframe-null&env=${this.options.env}&version=3&api=${this.options.api}&token=${this.options.token}`;
      url = `http://${this.DOMAIN_SDK}/#/preview/null/embed?iframeId=iframe-null&env=${this.options.env}&version=3&api=${this.options.api}&token=${this.options.token}`;
    } else if (this.options.streamType === 'url') {
      // url = `https://${this.DOMAIN_SDK}/#/url/?iframeId=iframe-${this.options.entityId}&version=3&url=${escape(this.options.url)}`;
      url = `http://${this.DOMAIN_SDK}/#/url/?iframeId=iframe-${this.options.entityId}&version=3&url=${escape(this.options.url)}`;
    } else if (this.options.streamType === 'vod') {
      // url = `https://${this.DOMAIN_SDK}/#/${this.options.appId}/publish/${this.options.entityId}/embed?iframeId=iframe-${this.options.entityId}&env=${this.options.env}&version=3&api=${this.options.api}&token=${this.options.token}`;
      url = `http://${this.DOMAIN_SDK}/#/${this.options.appId}/publish/${this.options.entityId}/embed?iframeId=iframe-${this.options.entityId}&env=${this.options.env}&version=3&api=${this.options.api}&token=${this.options.token}`;
    } else {
      // url = `https://${this.DOMAIN_SDK}/#/${this.options.appId}/live/${this.options.entityId}/embed?iframeId=iframe-${this.options.entityId}&streamName=${this.options.streamName}&region=${this.options.region}&feedId=${this.options.feedId}&env=${this.options.env}&version=3&native=true&showCCU=true&token=${this.options.token}&api=${this.options.api}`;
      url = `http://${this.DOMAIN_SDK}/#/${this.options.appId}/live/${this.options.entityId}/embed?iframeId=iframe-${this.options.entityId}&streamName=${this.options.streamName}&region=${this.options.region}&feedId=${this.options.feedId}&env=${this.options.env}&version=3&native=true&showCCU=true&token=${this.options.token}&api=${this.options.api}`;
    }
    if (typeof this.options.playerId !== 'undefined') {
      url += `&playerId=${this.options.playerId}`;
    }

    return url;
  }

  generateIframe() {
    const url = this.generatePreviewUrl();
    let iframe;

    if (this.options.ratio && this.options.ratio in this.templates) {
      iframe = this.templates[this.options.ratio];
    } else {
      iframe = this.templates.responsive;
    }

    iframe = _.replace(iframe, new RegExp("{entityId}", "g"), this.options.entityId);
    iframe = _.replace(iframe, new RegExp("{url}", "g"), url);
    if (this.options.iframeId) {
      iframe = _.replace(iframe, new RegExp(`iframe-${this.options.entityId}`, "g"), this.options.iframeId);
    }

    if (this.options.includeJs) {
      //$('head').append(`<!--<script src='https://${this.DOMAIN_SDK}/iframe_api.js'/></script>-->`);
      //iframe += `<script src='https://${this.DOMAIN_SDK}/iframe_api.js'/></script>`;
      $('head').append(`<script src='http://${this.DOMAIN_SDK}/iframe_api.js'/></script>`);
      iframe += `<script src='http://${this.DOMAIN_SDK}/iframe_api.js'/></script>`;
    }

    return iframe;
  }

  private detectOptions() {
    this.options.appId = this.userService.getUser().appId;
    this.options.api = btoa(`${environment.apiUrl}`);
    this.options.token = localStorage.getItem(environment.authenTokenKey);

    if (environment.env === 'development') {
      this.options.env = 'dev';
      this.DOMAIN_SDK = this.DOMAIN_SDK_DEV;
    } else if (environment.env === 'staging') {
      this.options.env = 'stag';
      this.DOMAIN_SDK = this.DOMAIN_SDK_STAG;
    } else {
      this.options.env = 'prod';
      this.DOMAIN_SDK = this.DOMAIN_SDK_PROD;
    }
  }
}
