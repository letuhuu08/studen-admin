export const slug = (string) =>{
	string = string.toLowerCase();     
 
	
	string = string
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, ''); 
 
	
	string = string.replace(/[đĐ]/g, 'd');
	
	
	string = string.replace(/([^0-9a-z-\s])/g, '');
 
	
	string = string.replace(/(\s+)/g, '-');
	
	
	string = string.replace(/-+/g, '-');
 
	
	string = string.replace(/^-+|-+$/g, '');

    return string
 
}