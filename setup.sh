#sudo apt-get -y update
#sudo apt-get -y install docker.io wget

# etcd
wget https://github.com/coreos/etcd/releases/download/v0.4.6/etcd-v0.4.6-linux-amd64.tar.gz
tar xvf etcd-v0.4.6-linux-amd64.tar.gz
sudo cp etcd-v0.4.6-linux-amd64/etcd /usr/bin
sudo cp etcd-v0.4.6-linux-amd64/etcdctl /usr/bin
sudo cp upstart/etcd.conf /etc/init/etcd.conf
sudo service etcd start

# confd
wget https://github.com/kelseyhightower/confd/releases/download/v0.6.3/confd-0.6.3-linux-amd64
sudo cp confd-0.6.3-linux-amd64 /usr/bin
sudo cp upstart/confd.conf /etc/init/confd.conf
sudo service confd start
