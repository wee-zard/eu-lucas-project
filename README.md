## 1. DNS

The application is hosted under the following DNS (= Domain Name System): `lucasimageanalyzer.com`.
This domain was bought from the following Domain Name Provider: [GoDaddy](https://www.godaddy.com/en-ph/offers/godaddy).

In the below section we will describe how to add a DNS to the application and what **Domain records** should be set both on the side of the *DNS Provider* and the *VM (Virtual Machine) Provider*.

### 1.1. How to set Domain Record on the DNS Provider's side?

We can use the above **GoDaddy**, or any other provider for this purpose.
After the DNS is bought, check out the **DNS > Domain Record** section on the provider's side and add the following **Domain Record**:

| Type | Name | Data                    | TTL         |
|------|------|-------------------------|-------------|
| A    | @    | ${IP_ADDRESS_OF_THE_VM} | 600 seconds |
| A    | api  | ${IP_ADDRESS_OF_THE_VM} | 600 seconds |
| A    | www  | ${IP_ADDRESS_OF_THE_VM} | 600 seconds |

In the place of the `${IP_ADDRESS_OF_THE_VM}` you should use your own **VM**'s IP Address (Internet Protocol Address).

### 1.2. How to set the Domain Record on the VM provider's side?

The *VM* is provided by [Rackforest](rackforest.com).
For this provider, it was enough to set a **Reverse DNS** that is pointing to an already existing DNS name. Here, we just needed to add the following name: `lucasimageanalyzer.com`, as this is our domain.
