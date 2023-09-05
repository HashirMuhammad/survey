import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-link-dialog',
  templateUrl: './link-dialog.component.html',
  styleUrls: ['./link-dialog.component.css'],
})
export class LinkDialogComponent {
  link: string = 'http://localhost:3000/api/surveys/public/'; // Replace with your actual link
  surveyId: string = '';
  isLinkCopied: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<LinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { dynamicUrl: string; surveyId: string },
    private clipboard: Clipboard
  ) {
    this.surveyId = data.surveyId;
    console.warn(this.surveyId);
    this.link = `http://localhost:4200/userform/${this.surveyId}`;
  }


  copyToClipboard() {
  if (this.link) {
    this.clipboard.copy(this.link);
    this.isLinkCopied = true; // Set it to true when the link is successfully copied
    setTimeout(() => {
      this.isLinkCopied = false; // Reset it after a few seconds
    }, 3000); // Hide the alert after 3 seconds (adjust the timing as needed)
  }
}

  closeDialog() {
    this.dialogRef.close();
  }
}
