import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], // Corrected styleUrl -> styleUrls
})
export class HomeComponent implements OnInit {
  loading = true;
  items: { id: string; title: string }[] = [];
  snippet: any;

  constructor(public authService:AuthService,private dbService: DatabaseService, private router: Router) {}
  async delete(snippetId: string) {
    if (snippetId) {
      try {
        await this.dbService.deleteSnippet(snippetId);
        console.log(`Snippet with ID: ${snippetId} deleted successfully`);
        this.router.navigate(['/']);
        this.items = this.items.filter((item) => item.id !== snippetId);
      } catch (error) {
        console.error('Error deleting snippet:', error);
      }
    } else {
      console.error('Snippet ID is not provided');
    }
  }
  del(){
    
  }

  async ngOnInit(): Promise<void> {
    setTimeout(() => {
      this.loading = false;
    }, 1000);

    try {
      // Fetch all snippets from the database
      const data = await this.dbService.getAllSnippet();
      this.items = data as { id: string; title: string }[];
      console.log(this.items);
    } catch (error) {
      console.error('Failed to fetch snippets:', error);
    }
  }
}
