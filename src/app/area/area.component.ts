import { CookieService } from "ngx-cookie-service";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({ templateUrl: './area.component.html' })
export class AreaComponent
{
    latitude = 45.4773;
    longitude = 9.1815;
    lat = -1;
    lng = -1;

    constructor(private router:Router, private cs:CookieService)
    {
        if(cs.get("username") == "")
            router.navigateByUrl("/login")
    }

    public onClick(event):void
    {
        this.lat = event.coords.lat;
        this.lng = event.coords.lng;
    }
}