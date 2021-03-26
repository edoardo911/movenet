import { CookieService } from "ngx-cookie-service";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({ templateUrl: './area.component.html' })
export class AreaComponent
{
    constructor(private router:Router, private cs:CookieService)
    {
        if(cs.get("username") == "")
            router.navigateByUrl("/login")
    }
}