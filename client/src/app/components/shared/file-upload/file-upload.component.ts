import { FileUploadService } from './../../../services/shared/file-upload.service';
import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  errors: Array<string> = [];
  dragAreaClass: string = "dragarea";
  send_to_server_as_form_data: string;
   // @Input() projectId: number = 0;
   // @Input() sectionId: number = 0;
  @Input() fileExt: string = "JPG, GIF, PNG";
  @Input() maxFiles: number = 5;
  @Input() maxSize: number = 5; // 5MB
  @Input() prefix: string;
  @Output() file_name = new EventEmitter();
  @Output() uploadStatus = new EventEmitter();

  constructor(private fileUploadService: FileUploadService) {}

  @HostListener("dragover", ["$event"])
  onDragOver(event) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragenter", ["$event"])
  onDragEnter(event) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragend", ["$event"])
  onDragEnd(event) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("dragleave", ["$event"])
  onDragLeave(event) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("drop", ["$event"])
  onDrop(event) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
    event.stopPropagation();
    var files = event.dataTransfer.files;
    this.saveFiles(files);
  }

  ngOnInit() {
    if (this.prefix == 'primary_file') {
      this.send_to_server_as_form_data = this.prefix;
      this.file_name.emit({ filename: this.prefix });
    } else if (this.prefix == 'secondary_file') {
      this.send_to_server_as_form_data = this.prefix;
      this.file_name.emit({ filename: this.prefix })
    } else {
      this.send_to_server_as_form_data = this.prefix;
      this.file_name.emit({filename:'dont_know'})
    }
  }

  onFileChange(event) {
    let files = event.target.files;
    this.saveFiles(files);
  }

  saveFiles(files) {
    // console.log("files = ",files)
    this.errors = []; // Clear error
    // Validate file size and allowed extensions
    if (files.length > 0 && !this.isValidFiles(files)) {
      this.uploadStatus.emit({upload_status:false,document_array:null});
      this.file_name.emit({upload_status:false,document_array:null});
      return;
    }
    if (files.length > 0) {
      const formData: FormData = new FormData();
      for (var j = 0; j < files.length; j++) {
        formData.append('file', files[j], files[j].name);
        // formData.append('file', this.send_to_server_as_form_data);
      // formData.append(this.send_to_server_as_form_data, files[j], files[j].name);
      }

      // var parameters = {
        // formData: formData
        // ,projectId: this.projectId
        // ,sectionId: this.sectionId
      // };
      // console.log("hello formData = ",formData.getAll("file"))
      // console.log("parameters = ",parameters)
      this.fileUploadService.uploadIMAGE(formData).subscribe(
        success => {
          this.uploadStatus.emit({upload_status:true,document_array:success});
          // console.log("files success = ",success);
          files = []; // Clear files array
        },
        error => {
          this.uploadStatus.emit({upload_status:false,document_array:null});
          this.errors.push(error.ExceptionMessage);
          files = []; // Clear files array
        }
      );
    }
  }

  private isValidFiles(files){
    // Check Number of files
     if (files.length > this.maxFiles) {
         this.errors.push("Error: At a time you can upload only " + this.maxFiles + " files");
         return;
     }
     this.isValidFileExtension(files);
     return this.errors.length === 0;
 }

  private isValidFileExtension(files){
    // Make array of file extensions
    var extensions = (this.fileExt.split(','))
                    .map(function (x) { return x.toLocaleUpperCase().trim() });
    for (var i = 0; i < files.length; i++) {
        // Get file extension
        var ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
        // Check the extension exists
        var exists = extensions.includes(ext);
        if (!exists) {
            this.errors.push("Error (Extension): " + files[i].name);
        }
        // Check file size
        this.isValidFileSize(files[i]);
    }
  }

  private isValidFileSize(file) {
    var fileSizeinMB = file.size / (1024 * 1000);
    var size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
    if (size > this.maxSize)
        this.errors.push("Error (File Size): " + file.name + ": exceed file size limit of " + this.maxSize + "MB ( " + size + "MB )");
  }

}
