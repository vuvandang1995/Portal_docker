from superadmin.plugin import opsutils
from keystoneclient.v3 import client
from neutronclient.v2_0 import client as client_neutron
from kvmvdi.settings import ROLE_USER, ROLE_ADMIN

class keystone(opsutils.Base):
    def __init__ (self, ip, username, password, project_name, user_domain_id, project_domain_id):
        super().__init__(ip, username, password, project_name, user_domain_id, project_domain_id)
        self.token_id = self.sess.get_token(self.auth)
        try:
            self.keystone = client.Client(session=self.sess)
            self.neutron = client_neutron.Client(session=self.sess)
        except:
            pass

    def create_project(self, name, domain):
        self.keystone.projects.create(name=name, domain=domain, description=None, enabled=True, parent=None)

    def delete_project(self, name):
        self.keystone.projects.delete(self.keystone.projects.find(name=name))
    
    def create_user(self, name, domain, project, password, email):
        self.keystone.users.create(name=name, domain=domain, project=project, password=password, email=email, description=None, enabled=True, parent=None)

    def delete_user(self, name):
        self.keystone.users.delete(self.keystone.users.find(name=name))

    def add_user_to_project(self, user, project):
        self.user = self.keystone.users.find(name=user)
        self.project = self.keystone.projects.find(name=project)
        self.role = self.keystone.roles.find(name=ROLE_USER)
        self.keystone.roles.grant(self.role, user=self.user, project=self.project)


    def find_project(self, project):
        return self.keystone.projects.find(name=project)

    def find_user(self, user):
        return self.keystone.users.find(name=user)
    # def get_role(self):
    #     print(self.keystone.roles.find(name='admin'))
    #     print(self.keystone.projects.find(name='user1'))
    #     print(self.keystone.users.find(name='admin'))

    def create_network(self, network_name):
        body_sample = {'network': {'name': network_name,
                                    'admin_state_up': True}}
        net = self.neutron.create_network(body=body_sample)
        body_create_subnet = {'subnets': [{'name': network_name, 'cidr': '192.168.0.0/24',
                                            'ip_version': 4, 'network_id': net['network']['id']}]}
        self.neutron.create_subnet(body=body_create_subnet)
        return net['network']['id']
    
    def show_network(self, network_id):
        return self.neutron.show_network(network_id)

    def show_subnet(self, subnet_id):
        return self.neutron.show_subnet(subnet_id)