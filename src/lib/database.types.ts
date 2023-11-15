export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			events: {
				Row: {
					created_at: string;
					id: string | null;
					link_id: string | null;
					location_city: string | null;
					location_country: string | null;
					ua_browser_name: string | null;
					ua_browser_version: string | null;
					ua_device_model: string | null;
					ua_device_type: string | null;
					ua_device_vendor: string | null;
					ua_os_name: string | null;
					ua_os_version: string | null;
				};
				Insert: {
					created_at?: string;
					id?: string | null;
					link_id?: string | null;
					location_city?: string | null;
					location_country?: string | null;
					ua_browser_name?: string | null;
					ua_browser_version?: string | null;
					ua_device_model?: string | null;
					ua_device_type?: string | null;
					ua_device_vendor?: string | null;
					ua_os_name?: string | null;
					ua_os_version?: string | null;
				};
				Update: {
					created_at?: string;
					id?: string | null;
					link_id?: string | null;
					location_city?: string | null;
					location_country?: string | null;
					ua_browser_name?: string | null;
					ua_browser_version?: string | null;
					ua_device_model?: string | null;
					ua_device_type?: string | null;
					ua_device_vendor?: string | null;
					ua_os_name?: string | null;
					ua_os_version?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'events_link_id_fkey';
						columns: ['link_id'];
						isOneToOne: false;
						referencedRelation: 'links';
						referencedColumns: ['id'];
					}
				];
			};
			links: {
				Row: {
					created_at: string;
					description: string | null;
					id: string;
					owner_id: string;
					redirect_url: string;
					slug: string;
					title: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					description?: string | null;
					id?: string;
					owner_id?: string;
					redirect_url: string;
					slug: string;
					title: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					description?: string | null;
					id?: string;
					owner_id?: string;
					redirect_url?: string;
					slug?: string;
					title?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'links_owner_id_fkey';
						columns: ['owner_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
