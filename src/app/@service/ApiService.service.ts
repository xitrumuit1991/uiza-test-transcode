import {UtilService} from './UtilService.service';
import {environment} from './../../environments/environment';
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers, RequestOptionsArgs} from '@angular/http';
import _ from 'lodash';

import {UserService} from './UserService.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Engine} from '../@Common/engine.common';

@Injectable()
export class ApiService {
  public api: any;

  constructor(private http: Http, private router: Router, private utilService: UtilService) {
    const apis = [
      {
        service: 'mediaStorage',
        url: '/media/storage',
        policy: 'private',
        fn: [
          {name: 'get', method: 'GET', prefix: ''},
          {name: 'create', method: 'POST', prefix: ''},
          {name: 'update', method: 'PUT', prefix: ''},
          {name: 'delete', method: 'DELETE', prefix: ''},
          {name: 'listFile', method: 'POST', prefix: '/ftp'},
          {name: 'testFtpConnection', method: 'POST', prefix: '/ftp/connection'},
          {name: 'testS3Connection', method: 'POST', prefix: '/s3/connection'},
          {name: 'testS3CompatibleConnection', method: 'POST', prefix: '/s3-compatible/connection'},
        ],
      },
      {
        service: 'mediaEntity',
        url: '/media/entity',
        policy: 'private',
        fn: [
          { name: 'search', method: 'GET', prefix: '/search' },
          { name: 'get', method: 'GET', prefix: '' },
          { name: 'create', method: 'POST', prefix: '' },
          { name: 'update', method: 'PUT', prefix: '' },
          { name: 'delete', method: 'DELETE', prefix: '' },
          { name: 'publish', method: 'POST', prefix: '/publish' },
          { name: 'publishGetStatus', method: 'GET', prefix: '/publish/status' },
          { name: 'createEntityRSubtitle', method: 'POST', prefix: '/related/subtitle' },
          { name: 'deleteEntityRSubtitle', method: 'DELETE', prefix: '/related/subtitle' },
          { name: 'createEntityMetadataRelation', method: 'POST', prefix: '/related/metadata' },
          { name: 'deleteEntityMetadataRelation', method: 'DELETE', prefix: '/related/metadata' },
          { name: 'deleteMultiEntityMetadataRelation', method: 'DELETE', prefix: '/related/metadata' },
        ],
      },
      {
        service: 'mediaExtendData',
        url: '/media/entity/extend-metadata',
        policy: 'private',
        fn: [
          {name: 'get', method: 'GET', prefix: ''},
          {name: 'create', method: 'POST', prefix: ''},
          {name: 'update', method: 'PUT', prefix: ''},
          {name: 'delete', method: 'DELETE', prefix: ''},
        ],
      },

      {
        service: 'configAWS',
        url: '/admin/app/config',
        policy: 'private',
        fn: [
          {name: 'get', method: 'GET', prefix: ''},
          {name: 'getTokenAws', method: 'GET', prefix: '/aws'},
          {name:'appsetting',method:'GET',prefix:'/all'},
        ],
      },
      {
        service: 'group',
        url: "/admin/group",
        policy: 'private',
        fn: [
          { name: 'getGroup', method: 'GET', prefix: '' },
          { name: 'createGroup', method: 'POST', prefix: '' },
          { name: 'updateGroup', method: 'PUT', prefix: '' },
          { name: 'deleteGroup', method: 'DELETE', prefix: '' },
          { name: 'changeGroup', method: 'PUT', prefix: '/changePermission' },
          { name: 'changeStatusGroup', method: 'PUT', prefix: '/changeStatus' },
        ],
      },

      {
        service: 'billing',
        url: '/billing',
        policy: 'private',
        children: [
          {
            service: 'config',
            url: '/config',
            fn: [
              {name: 'info', method: 'GET', prefix: '/getCustomerInfo'},
            ]
          }, {
            service: 'package',
            url: '/package',
            fn: [
              {name: 'list', method: 'GET', prefix: '/listAvailabelPackage'},
              {name: 'change', method: 'PUT', prefix: '/changePackage'},
              {name: 'current', method: 'GET', prefix: '/getCurrentPackage'},
            ]
          }, {
            service: 'pocket',
            url: '/pocket',
            fn: [
              {name: 'get', method: 'GET', prefix: '/history'},
              {name: 'create', method: 'POST', prefix: '/history'},
              {name: 'update', method: 'PUT', prefix: '/history'},
              {name: 'delete', method: 'DELETE', prefix: '/history'},
              {name: 'remain', method: 'GET', prefix: '/remain'},
              {name: 'total', method: 'GET', prefix: ''},
              {name: 'topup', method: 'GET', prefix: '/total'},
            ]
          }, {
            service: 'payment',
            url: '/payment',
            fn: [
              // card
              {name: 'chargeList', method: 'GET', prefix: '/charge/list'}
            ],
          }, {
            service: 'aggreate',
            url: '/aggreate',
            fn: [
              // card
              {name: 'data', method: 'GET', prefix: '/aggreateData'},
              {name: 'apiCall', method: 'GET', prefix: '/apiCall'},
              {name: 'storageMinute', method: 'GET', prefix: '/storageMinute'},
              {name: 'streamingMinute', method: 'GET', prefix: '/streamingMinute'},
              {name: 'getLive', method: 'GET', prefix: '/liveStream'}
            ],
          }, {
            service: 'invoice',
            url: '/invoice',
            fn: [
              {name: 'get', method: 'GET', prefix: ''},
              {name: 'detail', method: 'GET', prefix: '/detail'}
            ],
          }
        ],
        fn: [
          // card
          {name: 'createCard', method: 'POST', prefix: '/card'},
          {name: 'listCard', method: 'GET', prefix: '/card'},
          {name: 'deleteCard', method: 'DELETE', prefix: '/card'},
          {name: 'setPrimaryCard', method: 'PUT', prefix: '/card/setPrimary'},

          //
          {name: 'get', method: 'GET', prefix: ''},
          {name: 'create', method: 'POST', prefix: ''},
          {name: 'update', method: 'PUT', prefix: ''},
          {name: 'delete', method: 'DELETE', prefix: ''},

        ],
      },
      // only for authentication feature
      {
        service: 'adminUser',
        url: '/admin/user',
        policy: 'private',
        fn: [
          { name: 'logout', method: 'POST', prefix: '/logout' },
          { name: 'profile', method: 'GET', prefix: '/current' },
          {name:'listpermission',method:'GET',prefix:'/listServices'},
          {name:'create',method:'POST',prefix:''},
          {name:'update',method:'PUT',prefix:''},
          {name:'delete',method:'DELETE',prefix:''},
          {name:'get',method:'GET',prefix:''},
          {name:'getGroupUser',method:'GET',prefix:'/listAllGroups'},
          {name:'addGroupUser',method:'POST',prefix:'/addToGroup'},
          {name:'deleteGroupUser',method:'DELETE',prefix:'/removeFromGroup'},
          {name:'changePassword',method: 'POST', prefix: '/changePassword' },
          {name:'changePasswordByAdmin',method: 'POST', prefix: '/forceChangePassword' }
        ],
      },

      {
        service: 'adminDomain',
        url: '/admin/domain',
        policy: 'private',
        fn: [
          {name: 'get', method: 'GET', prefix: ''},
        ],
      },
      {
        service: 'auth',
        url: '/admin/user/auth',
        policy: 'public',
        fn: [
          {name: 'login', method: 'POST', prefix: ''},
        ],
      },
      {
        service: 'quickstart',
        url: '/live/entity',
        policy: 'public',
        fn: [
          {name: 'quick-start', method: 'POST', prefix: '/quick-start'},
        ],
      },

      {
        service: 'token',
        url: '/admin/user/auth/check-token',
        policy: 'private',
        fn: [
          {name: 'checkToken', method: 'GET', prefix: ''},
        ],
      }, {
        service: 'live',
        url: '/live/entity',
        policy: 'private',
        fn: [
          {name: 'list', method: 'GET', prefix: ''},
          {name: 'create', method: 'POST', prefix: ''},
          {name: 'update', method: 'PUT', prefix: ''},
          {name: 'delete', method: 'DELETE', prefix: ''},
          {name: 'event.feed', method: 'GET', prefix: '/feed'},
          {name: 'event.start', method: 'POST', prefix: '/feed'},
          {name: 'event.stop', method: 'PUT', prefix: '/feed'},
          {name: 'event.limit', method: 'GET', prefix: '/feed/limit'},
          {name: 'event.tracking', method: 'GET', prefix: '/tracking'},
          {name: 'event.view', method: 'GET', prefix: '/tracking/current-view'},
        ]
      }, {
        service: 'subtitle',
        url: '/media/subtitle',
        policy: 'private',
        fn: [
          {name: 'get', method: 'GET', prefix: ''},
          {name: 'create', method: 'POST', prefix: ''},
          {name: 'update', method: 'PUT', prefix: ''},
          {name: 'delete', method: 'DELETE', prefix: ''}
        ],
      }, {
        service: 'key',
        url: '/admin/app/key',
        policy: 'private',
        fn: [
          {name: 'get', method: 'GET', prefix: ''},
          {name: 'create', method: 'POST', prefix: ''},
          {name: 'update', method: 'PUT', prefix: ''},
          {name: 'delete', method: 'DELETE', prefix: ''}
        ],
      }, {
        service: 'analytic',
        url: '/analytic/',
        policy: 'private',
        fn: [
          { name: 'getApiCall', method: 'GET', prefix: 'billing/api-call' },
          { name: 'getStorageTime', method: 'GET', prefix: 'billing/storage-time' },
          { name: 'getStreamingTime', method: 'GET', prefix: 'billing/streaming-time' },
          { name: 'getLive', method: 'GET', prefix: 'billing/live' },
          { name: 'getApiPerforment', method: 'GET', prefix: 'dashboard/performance/total' },
          { name: 'getDashboardTotal', method: 'GET', prefix: 'dashboard/total-summary' },
          { name: 'getDashboardPopular', method: 'GET', prefix: 'dashboard/popular' },
          { name: 'getDashboardTrending', method: 'GET', prefix: 'dashboard/trending' },
          { name: 'getDashboardTop10', method: 'GET', prefix: 'dashboard/top10-country-view' },
          { name: 'getDashboardCountCurrentUser', method: 'GET', prefix: 'dashboard/count-current-user' },
          { name: 'getDashboardTopContent', method: 'GET', prefix: 'dashboard/top-content' },
          { name: 'getDashboardLine', method: 'GET', prefix: 'dashboard/top-content-line' },
          { name: 'getVideoQualityTotal', method: 'GET', prefix: 'entity/video-quality/total' },
          { name: 'getVideoQualityLine', method: 'GET', prefix: 'entity/video-quality/line' },
          { name: 'getVideoQualityType', method: 'GET', prefix: 'entity/video-quality/type' },
        ],
      },{
        service: 'analyticEntity',
        url: '/analytic/entity/',
        policy: 'private',
        fn: [
          { name: 'uniqueUser', method: 'GET', prefix: 'unique-user' },
          { name: 'summary', method: 'GET', prefix: 'summary' },
        ],
        children: [
          {
            service: 'metric',
            url: 'metric/',
            fn: [
              { name: 'device', method: 'GET', prefix: 'device'},
              { name: 'geo', method: 'GET', prefix: 'geo'},
              { name: 'player', method: 'GET', prefix: 'player'},
              { name: 'traffic', method: 'GET', prefix: 'traffic'},
            ]
          },{
            service: 'metricList',
            url: 'metric-list/',
            fn: [
              { name: 'device', method: 'GET', prefix: 'device'},
              { name: 'geo', method: 'GET', prefix: 'geo'},
              { name: 'player', method: 'GET', prefix: 'player'},
              { name: 'traffic', method: 'GET', prefix: 'traffic'},
            ]
          }
        ]
      }, {
        service: 'social',
        url: '/social',
        policy: 'private',
        children: [
          {
            service: 'info',
            url: "/info",
            fn: [
              { name: 'get', method: 'GET', prefix: '' },
              { name: 'create', method: 'POST', prefix: '' },
              { name: 'delete', method: 'DELETE', prefix: '' },
            ],
          }, {
            service: 'publish',
            url: "/publish",
            fn: [
              { name: 'create', method: 'POST', prefix: '' },
              { name: 'status', method: 'GET', prefix: '/getEntityStatus' },
            ],
          }, {
            service: 'youtube',
            url: "/youtube",
            fn: [
              { name: 'create', method: 'POST', prefix: '/extendToken' },
              { name: 'check', method: 'GET', prefix: '/checkUserChannel' },
            ],
          }
        ],
      }, {
        service: 'analytic',
        url: '/analytic',
        policy: 'private',
        children: [
          {
            service: 'business',
            url: '/business',
            fn: [
              { name: 'getPerformanceTotal', method: 'GET', prefix: '/performance-total' },
              { name: 'getPerformanceLine', method: 'GET', prefix: '/performance-line' },
              { name: 'getPlayThroughTotal', method: 'GET', prefix: '/play-through-total' },
              { name: 'getPlayThroughLine', method: 'GET', prefix: '/play-through-line' },
              { name: 'getReachTotal', method: 'GET', prefix: '/reach-total' },
              {name: 'getReachLine', method: 'GET', prefix: '/reach-line'},
              {name: 'getAssetVideo', method: 'GET', prefix: '/asset-video'},
              {name: 'getDevice', method: 'GET', prefix: '/device'},
              {name: 'geoGeo', method: 'GET', prefix: '/geo'},
              {name: 'getPlayer', method: 'GET', prefix: '/player'},
              {name: 'getTraffic', method: 'GET', prefix: '/traffic'}
            ],
          }],
      }, {
        service: 'mediaMetaData',
        url: "/media/metadata",
        policy: 'private',
        fn: [
          {name: 'get', method: 'GET', prefix: ''},
          {name: 'create', method: 'POST', prefix: ''},
          {name: 'update', method: 'PUT', prefix: ''},
          {name: 'delete', method: 'DELETE', prefix: ''},
          {name: 'createMultiMetadata', method: 'POST', prefix: '/related/entity'},
        ],
      },{
        service: 'cuePoint',
        url: "/media/entity/cue-point",
        policy: 'private',
        fn: [
          {name: 'get', method: 'GET', prefix: ''},
          {name: 'create', method: 'POST', prefix: ''},
          {name: 'update', method: 'PUT', prefix: ''},
          {name: 'delete', method: 'DELETE', prefix: ''},
        ],
      },{
        service: 'campaign',
        url: "/ads/campaign",
        policy: 'private',
        fn: [
          {name: 'get', method: 'GET', prefix: ''},
          {name: 'create', method: 'POST', prefix: ''},
          {name: 'update', method: 'PUT', prefix: ''},
          {name: 'delete', method: 'DELETE', prefix: ''},
        ],
      }, {
        service: 'player',
        url: "/player",
        policy: 'private',
        fn: [
          {name: 'getSkin', method: 'GET', prefix: '/skin'},
          {name: 'updateSkin', method: 'PUT', prefix: '/skin'},

          {name: 'getPlayer', method: 'GET', prefix: '/info'},
          {name: 'createPlayer', method: 'POST', prefix: '/info'},
          {name: 'updatePlayer', method: 'PUT', prefix: '/info'},
          {name: 'deletePlayer', method: 'DELETE', prefix: '/info'},
          {name: 'duplicatePlayer', method: 'POST', prefix: '/info/duplicate'},
        ],
      },
    ];

    this.api = {};
    const host = `//${environment.apiUrl}`;
    const mappingFunction = (items = [], apiTemp = {}, host) => {
      _.map(items, (api) => {
        if (!apiTemp[api.service]) {
          apiTemp[api.service] = {};
        }
        let prefix = `${host}`;
        if (api.policy) {
          prefix = `${prefix}${api.policy === 'public' ? '/api/public/v3' : '/api/private/v3'}`;
        }
        prefix = `${prefix}${api.url}`;
        _.map(api.fn, (item) => {
          let url = `${prefix}${item.prefix}`;
          apiTemp[api.service][item.name] = (params: any) => {
            const options: any = {
              url: url,
              method: item.method,
              body: params
            };

            if (item.headers) options.headers = item.headers;

            return this.request(options);
          };
        });
        _.map(api.children, (children) => {
          apiTemp[api.service] = mappingFunction(api.children, apiTemp[api.service], prefix);
        });


      });
      return apiTemp;
    };
    this.api = mappingFunction(apis, {}, host);

    // console.log(this.api);
    // _.map(apis, (api) => {
    //   _.map(api.fn, (item) => {
    //     if (!this.api[api.service]) {
    //       this.api[api.service] = {};
    //     }
    //     this.api[api.service][item.name] = (params: any) => {
    //       // console.log(params);
    //       let prefixUrl = `http://${environment.apiUrl}${api.policy === "public" ? "/api/public/v3" : "/api/private/v3"}`;
    //       const options: any = {
    //         url: `${prefixUrl}${api.url}${item.prefix}`,
    //         method: item.method,
    //         body: params
    //       };
    //       if (item.headers) options.headers = item.headers;
    //       return this.request(options);
    //     };
    //   });
    // });
  }

  private qs(params: any) {
    let url = '?';
    _.map(params, (item, key) => {
      url += `${key}=${item}&`;
    });
    url = url.replace(/&$/, '');
    return url;
  }

  private request(options: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const handleError = (error) => {
        let parseError: any;
        if (error) {
          parseError = error.json();
        } else {
          parseError = error;
        }
        // console.error(parseError)

        if (parseError && parseError.code === 401) {
          Engine.clearInterval();
          Engine.clearUserData();
          if (error.url.indexOf('/admin/user/auth') === -1) {
            this.utilService.notify('Seasion Expired', 'Seasion Expired. Please login again !', 'error');
            this.router.navigate(['auth/login']);
          }
        }
        if (parseError && parseError.code === 504) {
          this.utilService.notify('Maintenance system', 'Connect to server is interrupted, Please try again', 'error');
        }
        reject(parseError);
      };
      const handleSuccess = (result) => {

        resolve(result.json());

      };

      // const dataToken = this.userService.getToken();
      const dataToken = localStorage.getItem(environment.authenTokenKey);
      // console.log("data token :", dataToken)
      const header = new Headers();

      header.append('Content-Type', 'application/json');
      header.append('Authorization', dataToken);
      // console.log('header',header)
      // console.log("debugggggggggg : ", options.body)
      if (options.method === 'GET') {
        options.url += this.qs(options.body);
      }
      if (options.headers) {
        options.headers['Authorization'] = dataToken;
      }
      this.http.request(options.url, {
        method: options.method || 'GET',
        headers: options.headers || header,
        body: options.body
      }).toPromise().then(handleSuccess).catch(handleError);
    });
  }
}
