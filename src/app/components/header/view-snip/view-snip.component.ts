import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../../../services/database.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-view-snip',
  standalone: true,
  imports: [],
  templateUrl: './view-snip.component.html',
  styleUrl: './view-snip.component.scss',
})
export class ViewSnipComponent implements OnInit {
  codesSnipppet = {
    title: '',
    desc: '',
    code: '',
  };
  userEmail = '';
  constructor(
    private dbService: DatabaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit() {
    const docId = this.route.snapshot.paramMap.get('id');
    this.dbService
      .getSnippetById(docId!)
      .then((data: any) => {
        this.codesSnipppet = data;
      })
      .catch((error) => {
        console.error('Failed to fetch snippets:', error);
      });
  }
}
