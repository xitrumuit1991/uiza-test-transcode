import {AfterViewInit, Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
declare var $: any;

@Component({
  selector: 'app-uiza-menu-left',
  styleUrls: ['./index.component.scss'],
  templateUrl: './index.component.html',
})
export class UizaMenuLeftComponent implements OnInit,AfterViewInit{
  pathname = window.location.pathname;
  menus: any = [
    {
      title: 'Typograpy',
      icon: 'icon-setting',
      link: '/typography',
    },
    {
      title: 'Test Transcode',
      icon: 'icon-home-1',
      link: '/test-transcode',
      home: true,
    },
    {
      title: 'Video',
      icon: 'icon-video',
      link: '/admin/video-on-demand',
      children: [{
        title: 'Get started',
        link: '/admin/video-on-demand/task/create',
      },
      {
        title: 'Entities',
        link: '/admin/video-on-demand/entity/management',
      }, {
        title: 'Extend Data',
        link: '/admin/video-on-demand/extend/data',
      }, {
        title: 'Input Storage',
        link: '/admin/video-on-demand/storage/setting',
      }, {
        title: 'Category',
        link: '/admin/video-on-demand/metadata',
      }
      ],
    }, {
      title: 'Live',
      icon: 'icon-stream',
      link: '/admin/live-streaming',
      children: [{
        title: 'Create New event',
        link: '/admin/live-streaming/event/create',
      }, {
        title: 'Tracking events',
        link: '/admin/live-streaming/event/tracking',
      },
      ]
    },{
      title: 'PLAYER SETTING',
      icon: 'icon-player',
      link: '/admin/player-setting',
      children: [{
        title: 'Players',
        link: '/admin/player-setting/player/management',
      },
      ]
    },
    {
      title: 'Analytics',
      margin: 15,
      icon: 'icon-analytics',
      link: '/admin/analytic',
      children: [{
        title: 'Dashboard',
        link: '/admin/analytic/dashboard',
      }, {
        title: 'Video quality',
        link: '/admin/analytic/video-quality',
      },{
        title: 'Business Intelligence',
        link: '/admin/analytic/business-intelligence',
      },
      ]
    },{
      title: 'Billing',
      margin: 15,
      icon: 'icon-blilling',
      link: '/admin/billing',
      children: [{
        title: 'Data usage',
        link: '/admin/billing/data/usage',
      }, {
        title: 'Payment setting',
        link: '/admin/billing/payment/setting',
      },
      ],
    },
    {
      title: 'Application Settings',
      icon: 'icon-setting',
      link: '/admin/application-setting',
      children: [{
        title: 'Publish API',
        link: '/admin/application-setting/publish-api',
      },
        {
          title: 'Permission Settings',
          link: '/admin/application-setting/permission-group',
        },
        {
          title: 'User Management',
          link: '/admin/application-setting/user-management',
        },
        {
          title: 'Setting',
          link: '/admin/application-setting/setting',
        },
      ],
    }
  ];
  ngOnInit(){
  }
  ngAfterViewInit(){
    if($('.uiza-left-bar').css('bottom')=='-60px'){
      $('.uiza-left-bar').css('height',parseInt($('.uiza-left-bar').css('height').replace("px",""))-60)    }
  }
}
