import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

describe('AppComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule, BrowserModule],
            declarations: [AppComponent],
        })
    );

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    // it(`should have as title 'to-do-list'`, () => {
    //   const fixture = TestBed.createComponent(AppComponent);
    //   const app = fixture.componentInstance;
    //   expect(app.title).toEqual('to-do-list');
    // });

    // it('should render title', () => {
    //   const fixture = TestBed.createComponent(AppComponent);
    //   fixture.detectChanges();
    //   const compiled = fixture.nativeElement as HTMLElement;
    //   expect(compiled.querySelector('.content span')?.textContent).toContain('to-do-list app is running!');
    // });
});
